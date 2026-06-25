'use client'

import { useSidebarStore } from "@/store/sidebarStore";
import { Tooltip } from "@mui/material";
import {
  ChevronLeft,
  X,
  LayoutPanelLeft,
  AlignStartVertical,
  PanelRightClose,
  PanelLeftClose,
  PanelLeft,
  Atom,
  SquareMenu,
  Menu,
} from "lucide-react"; // lucide でモダンなアイコン
import { useEffect, useState } from "react";

export default function SidebarToggleButton() {
  const { isOpen, openSidebar, closeSidebar } = useSidebarStore();
  const [isMoving, setIsMoving] = useState(false);

  useEffect(() => {
    setIsMoving(true);
    const timer = setTimeout(() => setIsMoving(false), 1000); // 1s = Drawerのアニメと同じ
    return () => clearTimeout(timer);
  }, [isOpen]);

  return (
    <Tooltip title={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}>
      <button
        onClick={isOpen ? closeSidebar : openSidebar}
        aria-label={isOpen ? "サイドバーを閉じる" : "サイドバーを開く"}
        style={{
          width: 36,
          height: 36,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          transition:
            "left 0.5s cubic-bezier(0.0, 0, 0.2, 1), opacity 0.25s cubic-bezier(0.4,0,0.2,1)",
          opacity: isMoving ? 0.75 : 1,
        }}
        // onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.05)")}
        // onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isOpen ? <PanelLeftClose size={24} /> : <Menu size={26} />}
      </button>
    </Tooltip>
  );
}
