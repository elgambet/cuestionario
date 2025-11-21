"use client";

import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";

interface VideoPlayerProps {
  onLoadedMetadata: (duration: number) => void;
  onTimeUpdate: (currentTime: number) => void;
}

export interface VideoPlayerRef {
  playToTime: (targetTime: number) => void;
  getCurrentTime: () => number;
  getDuration: () => number;
}

interface VideoPlayerPropsExtended extends VideoPlayerProps {
  onSegmentComplete?: () => void;
}

const VideoPlayer = forwardRef<VideoPlayerRef, VideoPlayerProps>(
  ({ onLoadedMetadata, onTimeUpdate }, ref) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const targetTimeRef = useRef<number | null>(null);
    const isPlayingToTargetRef = useRef(false);

    useImperativeHandle(ref, () => ({
      playToTime: (targetTime: number) => {
        if (videoRef.current) {
          targetTimeRef.current = targetTime;
          isPlayingToTargetRef.current = true;
          videoRef.current.play();
        }
      },
      getCurrentTime: () => videoRef.current?.currentTime || 0,
      getDuration: () => videoRef.current?.duration || 0,
    }));

    useEffect(() => {
      const video = videoRef.current;
      if (!video) return;

      const handleLoadedMetadata = () => {
        onLoadedMetadata(video.duration);
      };

      const handleTimeUpdate = () => {
        const currentTime = video.currentTime;
        onTimeUpdate(currentTime);

        // Check if we've reached the target time
        if (
          isPlayingToTargetRef.current &&
          targetTimeRef.current !== null &&
          currentTime >= targetTimeRef.current
        ) {
          video.pause();
          isPlayingToTargetRef.current = false;
          targetTimeRef.current = null;
        }
      };

      video.addEventListener("loadedmetadata", handleLoadedMetadata);
      video.addEventListener("timeupdate", handleTimeUpdate);

      return () => {
        video.removeEventListener("loadedmetadata", handleLoadedMetadata);
        video.removeEventListener("timeupdate", handleTimeUpdate);
      };
    }, [onLoadedMetadata, onTimeUpdate]);

    return (
      <div className="fixed inset-0 w-full h-full">
        <video
          ref={videoRef}
          className="w-full h-full object-cover"
          playsInline
          muted
          preload="metadata"
        >
          <source src="/video.mp4" type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    );
  }
);

VideoPlayer.displayName = "VideoPlayer";

export default VideoPlayer;
