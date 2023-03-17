import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useAuth } from "../../../hooks/use-auth";
import { Form } from "../../ui/Form/Form";

export const SignUp = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { isAuth } = useAuth();

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
      .catch((error) => console.log(error))
      .finally(() => setLoading(false));
  };

  return !isAuth ? (
    <Form loading={loading} title="Регистрация" handleClick={handleRegister} />
  ) : (
    <Navigate to="/" />
  );
};
