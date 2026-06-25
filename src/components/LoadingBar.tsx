import React, { useEffect, useState } from "react";
import { Box, LinearProgress, Button, Typography, Link } from "@mui/material";
import { useRemotionStore } from "@/store/remotionStore";
import Hls from "hls.js";
import { useRemotion } from "@/hooks/useRemotion";
import { useAbortController } from "@/hooks/useAbortController";

export default function VideoRenderStatus({
  onClick,
  formError,
}: {
  onClick: () => void;
  formError: any;
}) {
  const { progress, isComplete } = useRemotion();
  const [displayProgress, setDisplayProgress] = useState(progress); // アニメーション用

  useEffect(() => {
    let animationFrameId: number;
    let duration = 60000;

    if (isComplete) {
      // 5秒後にアニメーションを完了させる
      duration = 5000;
    }

    const startTime = performance.now();
    const startValue = displayProgress;
    const endValue = progress;

    const animate = (currentTime: number) => {
      const elapsedTime = currentTime - startTime;
      const progressRatio = Math.min(elapsedTime / duration, 1);
      const newValue = startValue + (endValue - startValue) * progressRatio;
      setDisplayProgress(Math.round(newValue));

      if (progressRatio < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [progress]);

  return (
    <Box
      className="w-full h-full p-4 rounded-lg bg-white dark:bg-[#18181c] flex flex-col items-center"
    >
      <Box
        className="w-full h-full flex items-center justify-center bg-[#f1f3f6] dark:bg-[#23232a] rounded-lg border border-dashed border-[#b0bec5] dark:border-[#444459]"
      >
        <Typography variant="caption" color="text.secondary">
          広告スペース
        </Typography>
      </Box>

      {displayProgress === 100 ? (
        <Button
          variant="contained"
          color="primary"
          onClick={onClick}
          className="h-[50px] px-4 py-2 !my-4 text-sm rounded bg-gradient-to-r from-blue-600 to-blue-400 dark:from-[#1976d2] dark:to-[#42a5f5] text-white"
        >
          動画を見る
        </Button>
      ) : (
        <>
          <LinearProgress
            variant="determinate"
            value={displayProgress}
            className="mt-4 h-2 rounded-full w-full bg-[#e3e6ee] dark:bg-[#23232a]"
            sx={{
              "& .MuiLinearProgress-bar": {
                background: "linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)",
                borderRadius: 5,
                "@media (prefers-color-scheme: dark)": {
                  background: "linear-gradient(90deg, #00eaff 0%, #a259ff 100%)",
                },
              },
              boxShadow: "0 2px 8px 0 rgba(33,150,243,0.10)",
              "@media (prefers-color-scheme: dark)": {
                boxShadow: "0 2px 8px 0 rgba(0,234,255,0.10)",
              },
            }}
          />
          {formError.root?.message ? (
            <Typography
              variant="body2"
              className="my-4 text-red-500 dark:text-[#ff6b81] text-center"
            >
              <>
                {/* NOTE: リンクを含めたいので、以下のエラーメッセージのみ特別に処理している */}
                {formError.root.message === "API 使用制限に達しました。" ? (
                  <>
                    API 使用上限に達しました。
                    <Link href="/subscription">プランを変更</Link>
                    していただくか、明日またお試しください。
                  </>
                ) : formError.root.message ===
                  "API 使用制限に達しました。（未認証）" ? (
                  <>
                    API 使用上限に達しました。
                    <Link href="/auth/signin">ログイン</Link> または
                    明日以降にお試しください。
                  </>
                ) : (
                  formError.root.message
                )}
              </>
            </Typography>
          ) : (
            <Typography variant="body2" className="!my-4 text-blue-600 dark:text-[#00eaff]">
              Loading... {displayProgress}%
            </Typography>
          )}
        </>
      )}

      <Box
        textAlign="center"
        mb={0.5}
        display={"flex"}
        flexDirection="column"
        alignItems={"start"}
        margin={"0 auto"}
      >
        <Typography variant="caption" className="text-gray-600 dark:text-gray-400">
          <span style={{ marginRight: "1px" }}>※</span>
          動画の内容は必ずしも正しい情報とは限りません。情報の利用は自己責任でお願いします。
        </Typography>
      </Box>
    </Box>
  );
}
