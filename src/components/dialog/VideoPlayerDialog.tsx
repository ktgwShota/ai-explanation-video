import { Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { useDialogStore } from "../../store/dialogStore";
import ConfirmDialog from "./ConfirmDialog";
import React from "react";
import { useRemotionStore } from "@/store/remotionStore";
import { useAbortController } from "@/hooks/useAbortController";

export default function VideoPlayerDialog({
  children,
  PaperComponent,
  layoutId,
}: {
  children: React.ReactNode;
  PaperComponent?: any;
  layoutId?: string;
}) {
  const { abort } = useAbortController();
  const {
    isVideoPlayerDialogOpen,
    setIsVideoPlayerDialogOpen,
    isConfirmDialogOpen,
    setIsConfirmDialogOpen,
  } = useDialogStore();

  return (
    <React.Fragment>
      <Dialog
        open={isVideoPlayerDialogOpen}
        onClose={() => {
          setIsConfirmDialogOpen(true);
        }}
        PaperComponent={PaperComponent}
        PaperProps={{
          ...(layoutId ? { layoutId } : {}),
          initial: {
            borderRadius: 10,
            scale: 1,
            opacity: 1,
          },
          animate: {
            borderRadius: 10,
            scale: 1,
            opacity: 1,
          },
          transition: {
            duration: 0.5,
            ease: "easeInOut",
          },
          sx: {
            overflow: "hidden",
            width: "100%",
            maxWidth: 800,
            aspectRatio: "16/10",
            margin: 1.5,
          },
        }}
        sx={{
          "& .MuiDialog-paper": {
            borderRadius: "0px !important",
          },
        }}
      >
        <DialogContent sx={{ padding: 0 }}>{children}</DialogContent>
      </Dialog>

      {isConfirmDialogOpen && (
        <ConfirmDialog
          callbackByOnClose={() => {
            setIsVideoPlayerDialogOpen(false);
            // FIXME: コンソールに大量のエラーが出るので修正する
            abort("ユーザーの操作によって処理を中止しました。");
          }}
          displayContent={() => {
            return (
              <div>
                <p className="mb-2 font-bold">
                  ページを閉じると動画は削除されます
                </p>
                <p className="text-xs mb-1">
                  動画を視聴していなくても API の使用回数が消費されます。
                </p>
              </div>
            );
          }}
        />
      )}
    </React.Fragment>
  );
}
