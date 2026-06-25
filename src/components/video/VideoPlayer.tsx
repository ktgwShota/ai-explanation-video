import { useRemotionStore } from "@/store/remotionStore";
import Hls from "hls.js";
import { useRef, useEffect } from "react";

export default function VideoPlayer() {
  const { videoUrl } = useRemotionStore();
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    if (!videoUrl || !videoRef.current) return;

    const video = videoRef.current;

    // URLが固定なので、このuseEffectはマウント時に一度だけ実行される想定
    // 既にhlsインスタンスがあれば処理を中断（多重初期化防止）
    if (hlsRef.current) return;

    if (Hls.isSupported()) {
      // ✅ Hls.js の設定オブジェクト
      const hlsConfig = {
        // 再生開始位置を明示的に 0 に指定
        startPosition: 0,
      };

      const hls = new Hls(hlsConfig);
      hlsRef.current = hls; // インスタンスをrefに保存

      hls.loadSource(videoUrl);
      hls.attachMedia(video);

      hls.on(Hls.Events.ERROR, (event, data) => {
        console.error("HLS.js error:", data);
      });
    } else if (video.canPlayType("application/vnd.apple.mpegurl")) {
      // ネイティブHLS対応ブラウザの場合
      video.src = videoUrl;
      // メタデータ読み込み後にcurrentTimeを0に設定
      const handleMetadataLoaded = () => {
        video.currentTime = 0;
      };
      video.addEventListener("loadedmetadata", handleMetadataLoaded, { once: true });
    }

    return () => {
      if (hlsRef.current) {
        hlsRef.current.destroy();
        hlsRef.current = null;
      }
    };
  }, [videoUrl]);

  return (
    <video
      ref={videoRef}
      controls
      playsInline
      className="w-full rounded-[10px]"
    />
  );
}