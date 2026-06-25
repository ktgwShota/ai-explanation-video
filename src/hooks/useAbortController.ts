import { useCallback, useEffect } from 'react';
import { useAbortControllerStore } from '@/store/abortControllerStore';

/**
 * AbortControllerを管理し、非同期処理の中断機能を提供するカスタムフック
 * Zustandストアを使用してグローバルに状態を管理
 * TODO: コントローラーの引数に文字列を与えて同時に複数の処理を監視・中断できるようにしたい
 */
export const useAbortController = () => {
  const { getSignal: storeGetSignal, abort: storeAbort } = useAbortControllerStore();

  /**
   * 新しい AbortController を作成し、その signal を返す。
   * 呼び出されると、以前のコントローラーは中断される。
   */
  const getSignal = useCallback(() => {
    return storeGetSignal();
  }, [storeGetSignal]);

  /**
   * 現在進行中の処理を中断する
   * @param reason 中断理由（オプション）
   */
  const abort = useCallback((reason?: string) => {
    storeAbort(reason);
  }, [storeAbort]);

  // コンポーネントがアンマウントされたときに、進行中の処理があれば自動で中断する
  useEffect(() => {
    return () => {
      storeAbort('コンポーネントがアンマウントされました');
    };
  }, [storeAbort]);

  return { getSignal, abort };
};