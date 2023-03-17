import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { Navigate, useNavigate } from "react-router-dom";
import { useAuth } from "../../../hooks/use-auth";
import { setUser } from "../../../store/slice/userSlice/userSlice";
import { useAppDispatch } from "../../../store/store";
import { saveInLocalStorage } from "../../../utils/saveInLocalStorage";
import { Form } from "../../ui/Form/Form";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();

  const handleLogin = (email: string, password: string) => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        const authData = {
          email: user.email,
          token: user.refreshToken,
          id: user.uid,
        };
        //Store authorization data in localStorage
        saveInLocalStorage("authData", authData);

        dispatch(setUser(authData));
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
