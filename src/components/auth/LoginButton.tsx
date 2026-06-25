"use client";

import {
  Dialog,
  DialogTitle,
  DialogContent,
  Button,
  Stack,
  IconButton,
  Link,
} from "@mui/material";

import { useState } from "react";

export default function LoginButton() {
  const [open, setOpen] = useState<boolean>(false);

  return (
    <Button
      variant="contained"
      className="bg-transparent text-gray-800 dark:text-white shadow-none transition-all duration-300 text-sm py-0 px-2 hover:shadow-none"
      onClick={() => setOpen(true)}
      component={Link}
      href="/auth/signin"
    >
      ログイン
    </Button>
  );
}
