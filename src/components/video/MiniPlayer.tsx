"use client";
import { useRemotionStore } from "@/store/remotionStore";

export default function MiniPlayer() {
  const { videoUrl } = useRemotionStore();
//   if (!videoUrl) return null;

  return (
    <div>
      <div>MiniPlayer</div>
    </div>
  );
}