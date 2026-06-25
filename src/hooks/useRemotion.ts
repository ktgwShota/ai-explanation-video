import { useRemotionStore } from "@/store/remotionStore";
import Hls from "hls.js";
import { useEffect, useMemo, useState } from "react";

export const useRemotion = () => {
  const {
    videoUrl,
    setVideoUrl,
    progress,
    setProgress,
    reset
  } = useRemotionStore();

  useEffect(() => {
    if (!videoUrl) return;

    let hls: Hls | null = null;
    let intervalId: NodeJS.Timeout;

    const checkVideo = () => {
      const video = document.createElement("video");

      const onLoaded = () => {
        setProgress(100);
        clearInterval(intervalId);
        console.log("HLS動画の読み込みに成功しました");
      };

      const onError = () => {
        console.warn("HLS動画の読み込みに失敗。再試行します...");
      };

      if (Hls.isSupported()) {
        hls = new Hls();
        hls.attachMedia(video);
        hls.on(Hls.Events.MEDIA_ATTACHED, () => {
          hls!.loadSource(videoUrl);
          hls!.on(Hls.Events.MANIFEST_PARSED, onLoaded);
        });
        hls.on(Hls.Events.ERROR, onError);
      } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
        video.src = videoUrl;
        video.addEventListener("canplaythrough", onLoaded, { once: true });
        video.addEventListener("error", onError, { once: true });
        video.load();
      } else {
        console.warn("HLSがサポートされていないブラウザです。");
      }
    };

    checkVideo();
    intervalId = setInterval(() => {
      checkVideo();
    }, 7000);

    return () => {
      if (hls) hls.destroy();
      clearInterval(intervalId);
    };
  }, [videoUrl]);

 
  // NOTE: 最初の動画のURLが有効かどうか
  const isComplete = useMemo(() => progress === 100, [progress]);

  return {
    videoUrl,
    progress,
    setVideoUrl,
    setProgress,
    isComplete,
    resetRemotionStore: reset,
  };
};
