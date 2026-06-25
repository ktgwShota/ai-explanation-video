"use client";

import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Home, CreditCard, FileText, Shield, Mail } from "lucide-react";
import React, { useEffect } from "react";
import Box from "@mui/material/Box";
import { useSidebarStore } from "@/store/sidebarStore";
import Divider from "@mui/material/Divider";
import Link from "next/link";

export default function Sidebar() {
  const { isOpen } = useSidebarStore();

  useEffect(() => {
    document.body.style.transition =
      "margin-left 1s cubic-bezier(0.0, 0, 0.2, 1)";
    document.body.style.marginLeft = isOpen ? "250px" : "0";
    return () => {
      document.body.style.marginLeft = "0";
    };
  }, [isOpen]);

  return (
    <Drawer
      open={isOpen}
      variant="persistent"
      SlideProps={{
        timeout: 1000,
        easing: {
          enter: "cubic-bezier(0.0, 0, 0.2, 1)",
          exit: "cubic-bezier(0.0, 0, 0.2, 1)",
        },
      }}
      ModalProps={{
        hideBackdrop: true,
      }}
      PaperProps={{
        className: "w-[250px] shadow-none bg-gray-50 dark:bg-[#2A2A2A] text-inherit border-r border-gray-300 dark:border-gray-600",
      }}
    >
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="space-between"
        height="100%"
      >
        <List sx={{ mt: "10px", p: 0 }}>
          <ListItem component={Link} href="/" prefetch={false}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
              <CreditCard size={18} />
            </ListItemIcon>
            <ListItemText
              primary="動画を生成"
              primaryTypographyProps={{ fontSize: 15 }}
              sx={{ marginLeft: 0 }}
            />
          </ListItem>

          <ListItem component={Link} href="/subscription" prefetch={false} onClick={(e) => {
            // FIXME: 消す
             e.preventDefault();
             alert(
               "準備中です。"
             );
          }}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
              <CreditCard size={18} />
            </ListItemIcon>
            <ListItemText
              primary="サブスクリプション"
              primaryTypographyProps={{ fontSize: 15 }}
              sx={{ marginLeft: 0 }}
            />
          </ListItem>

          <Divider
            className="!mt-2 !mb-2.5"
          />

          <ListItem component={Link} href="/about" prefetch={false}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
              <Home size={18} />
            </ListItemIcon>
            <ListItemText
              primary="VoxQ とは"
              primaryTypographyProps={{ fontSize: 15 }}
              sx={{ marginLeft: 0 }}
            />
          </ListItem>
          <ListItem component={Link} href="/terms" prefetch={false}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
              <FileText size={18} />
            </ListItemIcon>
            <ListItemText
              primary="利用規約"
              primaryTypographyProps={{ fontSize: 15 }}
              sx={{ marginLeft: 0 }}
            />
          </ListItem>
          <ListItem component={Link} href="/privacy" prefetch={false}>
            <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
              <Shield size={18} />
            </ListItemIcon>
            <ListItemText
              primary="プライバシーポリシー"
              primaryTypographyProps={{ fontSize: 15 }}
              sx={{ marginLeft: 0 }}
            />
          </ListItem>

          {/* // TODO: */}
          <ListItem
            onClick={(e) => {
              e.preventDefault();
              alert(
                "現在、お問い合わせフォームは準備中です。X @xxx の DM にお問い合わせください。"
              );
            }}
            sx={{ cursor: "pointer" }}
          >
            <ListItemIcon sx={{ minWidth: 0, mr: 2, color: "inherit" }}>
              <Mail size={18} />
            </ListItemIcon>
            <ListItemText
              primary="お問い合わせ"
              primaryTypographyProps={{ fontSize: 15 }}
              sx={{ marginLeft: 0 }}
            />
          </ListItem>

          <Divider
            className="!mt-2.5 !mb-2"
          />
        </List>

        <List>
          <ListItem
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "flex-start",
              color: "inherit",
            }}
          >
            <ListItemText
              primary="&copy; VOICEVOX: ずんだもん."
              primaryTypographyProps={{ fontSize: 13 }}
              sx={{ marginLeft: 0 }}
            />
            <ListItemText
              primary="&copy; VOICEVOX: 四国めたん."
              primaryTypographyProps={{ fontSize: 13 }}
              sx={{ marginLeft: 0 }}
            />
            <ListItemText
              primary="&copy; VOICEVOX: 中国うさぎ."
              primaryTypographyProps={{ fontSize: 13 }}
              sx={{ marginLeft: 0 }}
            />
            <ListItemText
              primary="&copy; VOICEVOX: 春日部つむぎ."
              primaryTypographyProps={{ fontSize: 13 }}
              sx={{ marginLeft: 0 }}
            />
            <ListItemText
              primary="&copy; CHARACTER: 坂本アヒル."
              primaryTypographyProps={{ fontSize: 13 }}
              sx={{ marginLeft: 0 }}
            />
            <ListItemText
              primary="&copy; 2025 VoxTech. All rights reserved."
              primaryTypographyProps={{ fontSize: 13 }}
              sx={{ marginLeft: 0 }}
            />
          </ListItem>
        </List>
      </Box>
    </Drawer>
  );
}
