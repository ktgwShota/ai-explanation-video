"use client";
import React, { useRef } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import {
  Settings as SettingsIcon,
  AccountCircle,
  CreditCard,
  VolumeUp,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ListItemButton from "@mui/material/ListItemButton";
import { useColorMode } from "@/components/layout/ThemeRegistry";
import { UserSpeakerSettings } from "./UserSpeakerSettings";
import { useAuth } from "@/hooks/useAuth";

const settingMenu = [
  { label: "一般", icon: <SettingsIcon /> },
  // { label: "音声", icon: <VolumeUp /> },
  { label: "アカウント", icon: <AccountCircle /> },
  { label: "請求", icon: <CreditCard /> },
];

export default function SettingsDialog({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { user, userProfile } = useAuth();
  if (!user || !userProfile)
    throw new Error("Must not happen: 認証ユーザーのみ表示できるページです");
  const { toggleColorMode } = useColorMode();
  const [selectedMenu, setSelectedMenu] = useState("一般");

  const userSpeakerSettingsRef = useRef<{ handleSave: () => Promise<void> }>(
    null
  );
  const handleDialogClose = async () => {
    if (
      userSpeakerSettingsRef.current &&
      typeof userSpeakerSettingsRef.current.handleSave === "function"
    ) {
      await userSpeakerSettingsRef.current.handleSave();
    }
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleDialogClose} maxWidth="sm" fullWidth>
      <DialogTitle
        fontSize={17}
        className="text-center px-4 pt-7 pb-6 border-b border-gray-300 dark:border-gray-600"
      >
        設定
      </DialogTitle>
      <DialogContent
        className="p-4 h-[365px] [&.MuiDialogContent-root]:!pt-4"
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <List sx={{ width: 150, "&.MuiList-root": { padding: 0 } }}>
            {settingMenu.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  selected={selectedMenu === item.label}
                  onClick={() => setSelectedMenu(item.label)}
                >
                  <ListItemIcon sx={{ minWidth: 0, marginRight: 2 }}>
                    {React.cloneElement(item.icon, {
                      fontSize: "small",
                      sx: { fontSize: 20 },
                    })}
                  </ListItemIcon>
                  <ListItemText
                    primary={item.label}
                    primaryTypographyProps={{ fontSize: 15 }}
                    sx={{ marginLeft: 0 }}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>

          <Box
            sx={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              gap: 3,
            }}
          >
            {selectedMenu === "一般" && (
              <FormControl fullWidth>
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  className="mb-1 text-xs"
                >
                  サイトカラー
                </Typography>
                <Select
                  value="ライト"
                  onChange={(e) => {
                    toggleColorMode();
                  }}
                  className="[&_.MuiSelect-select]:text-sm"
                >
                  <MenuItem value="ライト" className="text-sm">
                    ライト
                  </MenuItem>
                  <MenuItem value="ダーク" className="text-sm">
                    ダーク
                  </MenuItem>
                </Select>
              </FormControl>
            )}

            {/* {selectedMenu === "音声" && (
              <UserSpeakerSettings ref={userSpeakerSettingsRef} />
            )} */}

            {selectedMenu === "アカウント" && (
              <>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    ユーザー名
                  </Typography>
                  <Typography variant="body1">
                    {user.user_metadata.name}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    メールアドレス
                  </Typography>
                  <Typography variant="body1">
                    {user.user_metadata.email}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="subtitle2" color="text.secondary">
                    パスワード
                  </Typography>
                  <Typography variant="body1">********</Typography>
                </Box>
              </>
            )}

            {selectedMenu === "請求" && (
              <Box>
                <Typography variant="subtitle2" color="text.secondary">
                  サブスクリプション
                </Typography>
                <Typography variant="body1">{userProfile.plan}</Typography>
              </Box>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
}
