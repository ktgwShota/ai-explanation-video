import { create } from "zustand";

type DialogStore = {
  isVideoPlayerDialogOpen: boolean;
  isConfirmDialogOpen: boolean;
  setIsVideoPlayerDialogOpen: (isOpen: boolean) => void;
  setIsConfirmDialogOpen: (isOpen: boolean) => void;
};

export const useDialogStore = create<DialogStore>((set) => ({
  isVideoPlayerDialogOpen: false,
  isConfirmDialogOpen: false,
  setIsVideoPlayerDialogOpen: (isOpen) =>
    set({ isVideoPlayerDialogOpen: isOpen }),
  setIsConfirmDialogOpen: (isOpen) => set({ isConfirmDialogOpen: isOpen }),
}));
