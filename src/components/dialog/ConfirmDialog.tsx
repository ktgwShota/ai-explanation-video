import { useDialogStore } from "@/store/dialogStore";
import { useRemotionStore } from "@/store/remotionStore";
import { Dialog, DialogContent, DialogActions, Button } from "@mui/material";

export default function ConfirmDialog({ callbackByOnClose, displayContent }: { callbackByOnClose: () => void, displayContent: () => React.ReactNode }) {
  const { isConfirmDialogOpen, setIsConfirmDialogOpen } = useDialogStore();

  return (
    // TODO: 動画が表示された後にブラウザバックおよび更新をしようとした時にもこのダイアログを出したい */}
    <Dialog open={isConfirmDialogOpen}>
      {/* TODO: 中央左揃えにする */}
      <DialogContent
        sx={{ textAlign: "center", display: "flex", flexDirection: "column", pb: 0 }}
      >
       {displayContent()}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setIsConfirmDialogOpen(false)} color="primary">
          キャンセル
        </Button>
        <Button
          onClick={() => {
            setIsConfirmDialogOpen(false);
            callbackByOnClose();
          }}
          color="primary"
        >
          閉じる
        </Button>
      </DialogActions>
    </Dialog>
  );
}
