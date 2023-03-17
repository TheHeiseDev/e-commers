import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import { setUser } from "../../../store/slice/userSlice/userSlice";
import { useAppDispatch } from "../../../store/store";
import { Form } from "../../ui/Form/Form";

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleRegister = (email: string, password: string) => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password).then(({ user }) => {
      dispatch(
        setUser({
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        })
      );
    });
    navigate("/login", { replace: false });
  };

  return !isAuth ? (
    <Form title="Регистрация" handleClick={handleRegister} />
  ) : (
    <Navigate to="/" />
  );
};
