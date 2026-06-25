import { Button, SxProps } from "@mui/material";

export default function SubmitButton({
  text,
  disabled,
  onClick,
  sx,
}: {
  text: string;
  disabled: boolean;
  onClick: () => any;
  sx?: SxProps;
}) {
  return (
    <Button
      type="submit"
      variant="contained"
      disabled={disabled}
      onClick={onClick}
      sx={sx}
    >
      {text}
    </Button>
  );
}
