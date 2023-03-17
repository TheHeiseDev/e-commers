import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import { setUser } from "../../../store/slice/userSlice/userSlice";
import { useAppDispatch } from "../../../store/store";
import { Form } from "../../ui/Form/Form";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        console.log(user);
        const authData = {
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        };

        dispatch(
          setUser({
            email: user.email,
            token: user.refreshToken,
            id: user.uid,
          })
        );
        navigate("/", { replace: false });
      })
      .catch(() => alert("Не верные данные авторизации"));
  };

  return !isAuth ? (
    <div>
      <Form title="Вход" handleClick={handleLogin} />
    </div>
  ) : (
    <Navigate to="/" />
  );
};
