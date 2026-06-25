import { create } from 'zustand';

interface AbortControllerState {
  abortController: AbortController | null;
  getSignal: () => AbortSignal;
  abort: (reason?: string) => void;
}

export const useAbortControllerStore = create<AbortControllerState>((set, get) => ({
  abortController: null,

  getSignal: () => {
    const { abortController } = get();
    // 既存のコントローラーがあれば中断
    abortController?.abort('前の処理がキャンセルされました');

    // 新しいコントローラーを作成
    const controller = new AbortController();
    set({ abortController: controller });
    return controller.signal;
  },

  abort: (reason = '処理がキャンセルされました') => {
    const { abortController } = get();
    abortController?.abort(reason);
    set({ abortController: null });
  },
})); 