'use client'

import { useAuth } from "@/hooks/useAuth";
import UserAvatar from "../auth/UserAvatar";
import { Button } from "@mui/material";

export default function HeaderActions() {
  const { user } = useAuth();

  return (
    <div>
      {user ? (
        <UserAvatar />
      ) : (
        <Button
          variant="contained"
          color="primary"
          href="/auth/signin"
          sx={{
            px: "12px",
            py: "6px",
            boxShadow: "none",
            ":hover": {
              boxShadow: "none",
            },
          }}
          className="!bg-[#333] !text-[#FFF] dark:!bg-[#FFF] dark:!text-[#4C4C4C]"
        >
          ログイン
        </Button>
      )}
    </div>
  );
}