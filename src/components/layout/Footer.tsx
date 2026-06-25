import { Box } from "@mui/material";
import { headers } from "next/headers";

const exclusionPaths = [
  '/about',
  '/auth/signin',
]

export default async function Footer() {
  const headersList = await headers();
  const pathname = headersList.get("x-current-path") || '';
  const isFooterVisible = !exclusionPaths.includes(pathname);
  if (isFooterVisible) return null;

  return (
    <Box
      component="footer"
      sx={{
        bgcolor: "inherit",
        color: "inherit",
      }}
      className="h-20 flex justify-end items-end"
    >
      {/* TODO: フッターを作成 */}
    </Box>
  );
}
