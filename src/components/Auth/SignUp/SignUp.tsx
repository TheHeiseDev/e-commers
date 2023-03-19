import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

import { useAuth } from "../../../hooks/use-auth";
import { Form } from "../../ui/Form/Form";
import { useAppDispatch } from "../../../store/store";
import { setError } from "../../../store/slice/userSlice/userSlice";

enum ErrorCodeSignUp {
  inUse = "auth/email-already-in-use",
}

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAuth } = useAuth();

  const handleSetError = (status: boolean, message: string) => {
    const objError = {
      status,
      message,
    };
    dispatch(setError(objError));
  };

  const errorHandler = (errorMessage: string) => {
    if (errorMessage === ErrorCodeSignUp.inUse) {
      handleSetError(true, "Такой пользователь уже существует");
    } else {
      handleSetError(true, "Возникла ошибка при регистрации");
    }
  };

  useEffect(() => {
    dispatch(setError(null));
  }, []);
  const handleRegister = (email: string, password: string) => {
    setLoading(true);
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(({ user }) => {
        if (user) {
          setLoading(false);
          navigate("/login", { replace: false });
        }
      })
      .catch(({ code }) => {
        errorHandler(code);
      })
      .finally(() => setLoading(false));
  };

  return !isAuth ? (
    <Form loading={loading} title="Регистрация" handleClick={handleRegister} />
  ) : (
    <Navigate to="/" />
  );
};
