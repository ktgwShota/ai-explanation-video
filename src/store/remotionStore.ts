import { create } from "zustand";

interface RemotionState {
  videoUrl: string | null;
  progress: number;
  error: string;
  setVideoUrl: (videoUrl: string | null) => void;
  setProgress: (progress: number) => void;
  setError: (error: string) => void;
  reset: () => void;
}

/**
 * @param renderId Remotion のレスポンスに含まれる ID。 関連ファイル -> useRemotionRenderStatus
 * @param videoUrl Remotion のレスポンスに含まれる動画の URL。 関連ファイル -> VideoPlayer
 */
export const useRemotionStore = create<RemotionState>((set) => ({
  videoUrl: null,
  progress: 0,
  error: "",
  setVideoUrl: (videoUrl: string | null) => set({ videoUrl }),
  setProgress: (progress) => set({ progress }),
  setError: (error) => set({ error }),
  reset: () =>
    set({
      videoUrl: null,
      progress: 0,
      error: "",
    }),
}));
