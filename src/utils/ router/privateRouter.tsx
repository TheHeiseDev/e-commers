import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../hooks/use-auth";

export const PrivateRouter = () => {
  // const isAuth = useAuth();
  const isAuth = false;
  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
