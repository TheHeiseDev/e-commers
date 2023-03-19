import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

export default function AuthAlert({ title, display }) {
  return display ? (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">{title}</Alert>
    </Stack>
  ) : null;
}
