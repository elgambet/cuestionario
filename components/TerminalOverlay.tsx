"use client";

import { useState, useEffect } from "react";
import { Question } from "@/constants/questionnaire";

interface TerminalOverlayProps {
  question: Question;
  onAnswer: (isCorrect: boolean) => void;
  disabled: boolean;
  shouldStartTyping: boolean;
}

export default function TerminalOverlay({
  question,
  onAnswer,
  disabled,
  shouldStartTyping,
}: TerminalOverlayProps) {
  const [displayedQuestion, setDisplayedQuestion] = useState("");
  const [showAnswers, setShowAnswers] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [typingComplete, setTypingComplete] = useState(false);
  const [redCircleClicks, setRedCircleClicks] = useState(0);
  const [showPasswordInput, setShowPasswordInput] = useState(false);
  const [password, setPassword] = useState("");

  useEffect(() => {
    // Reset state when question changes
    setDisplayedQuestion("");
    setShowAnswers(false);
    setSelectedAnswer(null);
    setTypingComplete(false);
  }, [question]);

  useEffect(() => {
    // Only start typing when shouldStartTyping is true
    if (!shouldStartTyping) return;

    let currentIndex = 0;
    const typingSpeed = 50; // milliseconds per character

    const typingInterval = setInterval(() => {
      if (currentIndex < question.question.length) {
        setDisplayedQuestion(question.question.slice(0, currentIndex + 1));
        currentIndex++;
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
        // Show answers after a short delay
        setTimeout(() => {
          setShowAnswers(true);
        }, 300);
      }
    }, typingSpeed);

    return () => clearInterval(typingInterval);
  }, [question, shouldStartTyping]);

  const handleAnswerClick = (index: number) => {
    if (disabled || selectedAnswer !== null) return;

    setSelectedAnswer(index);
    const isCorrect = question.answers[index].isCorrect;

    // Wait a moment before calling onAnswer to show the selection
    setTimeout(() => {
      onAnswer(isCorrect);
    }, 500);
  };

  const handleRedCircleClick = () => {
    const newCount = redCircleClicks + 1;
    console.log("Red circle clicked:", newCount);
    setRedCircleClicks(newCount);

    if (newCount >= 5) {
      console.log("Opening password input");
      setShowPasswordInput(true);
      setRedCircleClicks(0);
    }
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "pv5603") {
      localStorage.clear();
      window.location.reload();
    } else {
      setPassword("");
      setShowPasswordInput(false);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-10 m-2">
      <div className="relative flex flex-col gap-2 max-w-2xl mx-auto bg-black/80 backdrop-blur-sm border-2 border-green-500 rounded-lg font-mono text-green-400 shadow-2xl">
        {/* Terminal header */}
        <div className="flex items-center gap-2 border-b border-green-500/50 p-1">
          <div className="flex gap-1.5">
            <div
              className="w-3 h-3 rounded-full bg-red-500 cursor-pointer hover:bg-red-400 active:scale-90 transition-all"
              onClick={handleRedCircleClick}
              style={{ minWidth: "12px", minHeight: "12px" }}
            ></div>
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
          </div>
          <span className="text-xs text-green-500/70">
            terminal@cuestionario:~$
          </span>
        </div>

        {/* Password input modal */}
        {showPasswordInput && (
          <div className="absolute inset-0 bg-black/95 flex items-center justify-center z-50 rounded-lg">
            <form
              onSubmit={handlePasswordSubmit}
              className="flex flex-col gap-4 p-6"
            >
              <div className="text-yellow-400 text-center">
                <span className="text-yellow-500">$ </span>
                Ingrese la contraseña
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-black border border-yellow-500 text-yellow-400 px-4 py-2 rounded focus:outline-none focus:border-yellow-300"
                autoFocus
              />
              <div className="flex gap-2">
                <button
                  type="submit"
                  className="flex-1 bg-green-500/20 border border-green-500 text-green-400 px-4 py-2 rounded hover:bg-green-500/30"
                >
                  Confirmar
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setShowPasswordInput(false);
                    setPassword("");
                  }}
                  className="flex-1 bg-red-500/20 border border-red-500 text-red-400 px-4 py-2 rounded hover:bg-red-500/30"
                >
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Show loading message when disabled */}
        {disabled ? (
          <div className="text-yellow-400 text-lg font-bold animate-pulse text-center py-8 pl-1 pr-1">
            <span className="text-yellow-500">$ </span>
            Agarrate fuerte, estamos ascendiendo...
          </div>
        ) : (
          <>
            {/* Question */}
            <div className="mb-4 pl-1 pr-1">
              <span className="text-green-500">$ </span>
              <span className="text-green-400 text-sm">
                {displayedQuestion}
              </span>
              {!typingComplete && (
                <span className="inline-block w-2 h-4 bg-green-400 ml-1 animate-pulse"></span>
              )}
            </div>

            {/* Answers */}
            <div className="pb-2">
              {showAnswers && (
                <div className="space-y-2">
                  {question.answers.map((answer, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(index)}
                      disabled={disabled || selectedAnswer !== null}
                      className={`w-[95%] text-left p-3 ml-2 rounded border transition-all ${
                        selectedAnswer === index
                          ? answer.isCorrect
                            ? "bg-green-500/30 border-green-400 text-green-300"
                            : "bg-red-500/30 border-red-400 text-red-300"
                          : "border-green-500/50 hover:bg-green-500/10 hover:border-green-400"
                      } ${
                        disabled || selectedAnswer !== null
                          ? "cursor-not-allowed opacity-50"
                          : "cursor-pointer"
                      }`}
                    >
                      <span className="text-green-500">[{index + 1}]</span>{" "}
                      <span>{answer.text}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
}
