import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface IAuthAlert {
  title: string | null;
  display: boolean | null;
}
export default function AuthAlert({ title, display }: IAuthAlert) {
  return display ? (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">{title}</Alert>
    </Stack>
  ) : null;
}
