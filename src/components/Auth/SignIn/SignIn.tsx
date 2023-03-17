import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { setUser } from "../../../store/slice/userSlice/userSlice";
import { useAppDispatch } from "../../../store/store";
import { useAuth } from "../../../hooks/use-auth";
import { saveInLocalStorage } from "../../../utils/saveInLocalStorage";
import { Form } from "../../ui/Form/Form";

export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [laoding, setLoading] = useState(false);
  const { isAuth } = useAuth();

  const handleLogin = (email: string, password: string) => {
    setLoading(true);
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
        setLoading(false);
        navigate("/", { replace: false });
      })
      .catch(() => {
        alert("Не верные данные авторизации");
      })
      .finally(() => setLoading(false));
  };

  return !isAuth ? (
    <div>
      <Form loading={laoding} title="Вход" handleClick={handleLogin} />
    </div>
  ) : (
    <Navigate to="/" />
  );
};
