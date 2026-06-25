import {
  AppBar,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";

import SidebarToggleButton from "./SidebarToggleButton";
import HeaderActions from "./HeaderActions";
import { headers } from "next/headers";

export default async function Header() {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path");
  const showHeader = !pathname?.startsWith("/auth/signin")
  if (!showHeader) return null;

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: "none",
        height: '80px',
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          width: "100%",
          height: '100%',
          margin: "0 auto",
          p: 2.5,
        }}
      >
        <SidebarToggleButton />
        <Box

          sx={{
            display: "flex",
            alignItems: "center",
            ml: 2,
            mr: "auto",
            transition: "margin-left 1s cubic-bezier(0.0, 0, 0.2, 1)",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontWeight: 700,
              letterSpacing: 1,
              fontSize: 24,
            }}
            className="text-[#333] dark:text-[#FFF]"
            component="a"
            href="/"
          >
            VoxQ
          </Typography>
        </Box>

        <HeaderActions />
      </Toolbar>
    </AppBar>
  );
}
