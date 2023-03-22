import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

import { setError, setUser } from "store/slice/userSlice/userSlice";
import { useAppDispatch } from "store/store";
import { useHistory } from "hooks/use-history";
import { useAuth } from "hooks/use-auth";

import { saveInLocalStorage } from "utils/saveInLocalStorage";
import { Form } from "../../ui/Form/Form";

enum ErrorCodeSignIn {
  login = "auth/user-not-found",
  password = "auth/wrong-password",
  anyRequest = "auth/too-many-requests",
}
export const SignIn = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { isAuth } = useAuth();
  const { history } = useHistory();

  const [laoding, setLoading] = useState(false);
  const path = history ? history : "/";

  const handleSetError = (status: boolean, message: string) => {
    const objError = {
      status,
      message,
    };
    dispatch(setError(objError));
  };
  const errorHandler = (errorMessage: string) => {
    if (errorMessage === ErrorCodeSignIn.login) {
      handleSetError(true, "Неверный логин");
    } else if (errorMessage === ErrorCodeSignIn.password) {
      handleSetError(true, "Неверный пароль");
    } else if (errorMessage === ErrorCodeSignIn.anyRequest) {
      handleSetError(true, "Много попыток, попробуйте позже");
    } else {
      console.log(errorMessage);
      handleSetError(true, "Возникла ошибка при авторизации");
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(setError(null));
  }, []);

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

        navigate(path, { replace: false });
      })
      .catch(({ code }) => {
        errorHandler(code);
      })
      .finally(() => setLoading(false));
  };

  return !isAuth ? (
    <Form loading={laoding} title="Вход" handleClick={handleLogin} />
  ) : (
    <Navigate to={path} />
  );
};
