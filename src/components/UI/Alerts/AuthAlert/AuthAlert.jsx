import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import { useLocation } from "react-router-dom";

export default function AuthAlert({ title, display }) {
  const { pathname } = useLocation();

  return display && pathname === "/register" ? (
    <Stack sx={{ width: "100%" }} spacing={2}>
      <Alert severity="error">{title}</Alert>
    </Stack>
  ) : null;
}
