import { Link } from "react-router-dom";
import { SignUp } from "../../components/Auth/SignUp/SignUp";

const RegisterPage = () => {
  return (
    <div>
      <h1>Регистрация</h1>
      <SignUp />
      <p>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </div>
  );
};

export default RegisterPage;
