"use client";

import { useState, useRef, useCallback, useEffect } from "react";
import VideoPlayer, { VideoPlayerRef } from "@/components/VideoPlayer";
import TerminalOverlay from "@/components/TerminalOverlay";
import EndScreen from "@/components/EndScreen";
import MobileOnlyWarning from "@/components/MobileOnlyWarning";
import { QUESTIONS } from "@/constants/questionnaire";

const STORAGE_KEY = "quiz_progress";

export default function Home() {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [isQuestionDisabled, setIsQuestionDisabled] = useState(false);
  const [videoDuration, setVideoDuration] = useState(0);
  const [isQuizComplete, setIsQuizComplete] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const videoPlayerRef = useRef<VideoPlayerRef>(null);
  const expectedTargetTimeRef = useRef<number>(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const data = JSON.parse(saved);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setCurrentQuestionIndex(data.currentQuestionIndex || 0);
        setScore(data.score || 0);
        setIsQuizComplete(data.isQuizComplete || false);
      } catch (error) {
        console.error("Error loading progress:", error);
      }
    }
    setIsLoaded(true);
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          currentQuestionIndex,
          score,
          isQuizComplete,
        })
      );
    }
  }, [currentQuestionIndex, score, isQuizComplete, isLoaded]);

  const timePerQuestion = videoDuration / QUESTIONS.length;

  const handleVideoLoadedMetadata = useCallback(
    (duration: number) => {
      setVideoDuration(duration);

      // Seek video to correct position based on current question
      if (currentQuestionIndex > 0 && !isQuizComplete) {
        const timePerQuestion = duration / QUESTIONS.length;
        const targetTime = currentQuestionIndex * timePerQuestion;
        const videoElement = document.querySelector("video");
        if (videoElement && videoElement.readyState >= 2) {
          // readyState >= 2 means we have enough data to seek
          videoElement.currentTime = targetTime;
        }
      }
    },
    [currentQuestionIndex, isQuizComplete]
  );

  const handleVideoTimeUpdate = useCallback(
    (currentTime: number) => {
      // Check if video has reached the expected target time
      if (
        isQuestionDisabled &&
        expectedTargetTimeRef.current > 0 &&
        currentTime >= expectedTargetTimeRef.current - 0.3
      ) {
        // Re-enable the question after video segment finishes
        setIsQuestionDisabled(false);
        expectedTargetTimeRef.current = 0;
      }
    },
    [isQuestionDisabled]
  );

  const handleAnswer = useCallback(
    (isCorrect: boolean) => {
      if (isQuestionDisabled) return;

      // Update score if answer is correct
      if (isCorrect) {
        setScore((prevScore) => prevScore + 1);
      }

      // Disable question while video plays
      setIsQuestionDisabled(true);

      // Calculate target time for this question
      const targetTime = (currentQuestionIndex + 1) * timePerQuestion;
      expectedTargetTimeRef.current = targetTime;

      // Play video to target time
      if (videoPlayerRef.current) {
        videoPlayerRef.current.playToTime(targetTime);
      }

      // Move to next question or finish quiz
      setTimeout(() => {
        if (currentQuestionIndex < QUESTIONS.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        } else {
          // Quiz complete
          setIsQuizComplete(true);
        }
      }, 500);
    },
    [currentQuestionIndex, isQuestionDisabled, timePerQuestion]
  );

  // Don't render until loaded from localStorage
  if (!isLoaded) {
    return (
      <div className="relative w-full h-screen overflow-hidden bg-black"></div>
    );
  }

  return (
    <div className="relative w-full h-screen overflow-hidden">
      {/* Mobile Only Warning */}
      <MobileOnlyWarning />

      {/* Video Background */}
      <VideoPlayer
        ref={videoPlayerRef}
        onLoadedMetadata={handleVideoLoadedMetadata}
        onTimeUpdate={handleVideoTimeUpdate}
      />

      {/* Question Overlay */}
      {!isQuizComplete && videoDuration > 0 && (
        <TerminalOverlay
          question={QUESTIONS[currentQuestionIndex]}
          onAnswer={handleAnswer}
          disabled={isQuestionDisabled}
          shouldStartTyping={!isQuestionDisabled}
        />
      )}

      {/* End Screen */}
      {isQuizComplete && <EndScreen score={score} />}
    </div>
  );
}
