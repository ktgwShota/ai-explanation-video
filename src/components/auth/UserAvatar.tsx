"use client";

import {
  Avatar,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { useState } from "react";
import SettingsDialog from "./SettingsDialog";
import { useAuth } from "@/hooks/useAuth";
import Settings from "@mui/icons-material/Settings"; // 設定アイコンをインポート
import Logout from "@mui/icons-material/Logout"; // ログアウトアイコンをインポート

export default function UserAvatar() {
  const { user, signOut } = useAuth();
  if (!user || !signOut) {
    throw new Error(
      "Must not happen: 認証済みユーザーのみ表示できるコンポーネントです"
    );
  }
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [settingsOpen, setSettingsOpen] = useState(false);

  return (
    <>
      <Avatar
        src={user.user_metadata.avatar_url}
        onClick={(e) => setAnchorEl(e.currentTarget)}
        sx={{ cursor: "pointer", width: 35, height: 35 }}
      />
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
        onClick={() => setAnchorEl(null)}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        sx={{
          fontSize: 14,
          marginTop: "20px",
          "& .MuiPaper-root": {
            // メニューの幅を調整する場合
            minWidth: 134,
          },
          "& .MuiMenuItem-root": {
            "&:hover": {
              bgcolor: "action.hover",
            },
            padding: 1,
          },
          "& .MuiButtonBase-root": { p: 1.5 },
          "& .MuiList-root": { py: 0 },
        }}
      >
        <MenuItem
          onClick={() => setSettingsOpen(true)}
          sx={(theme) => ({
            "& .MuiListItemIcon-root": { minWidth: 32 },
            borderBottom:
              theme.palette.mode === "dark"
                ? "0.5px solid rgba(255, 255, 255, 0.12)"
                : "0.5px solid #DDD",
          })}
        >
          <ListItemIcon>
            <Settings fontSize="small" />
          </ListItemIcon>
          <ListItemText
            sx={{
              "& .MuiTypography-root": { fontSize: 15 },
            }}
          >
            設定
          </ListItemText>
        </MenuItem>
        <MenuItem
          onClick={signOut}
          sx={(theme) => ({
            "& .MuiListItemIcon-root": { minWidth: 30, ml: "2px" },
            borderTop:
              theme.palette.mode === "dark"
                ? "0.5px solid rgba(255, 255, 255, 0.12)"
                : "0.5px solid #DDD",
          })}
        >
          <ListItemIcon>
            <Logout fontSize="small" />
          </ListItemIcon>
          <ListItemText sx={{ "& .MuiTypography-root": { fontSize: 15 } }}>
            ログアウト
          </ListItemText>
        </MenuItem>
      </Menu>

      <SettingsDialog
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
      />
    </>
  );
}
