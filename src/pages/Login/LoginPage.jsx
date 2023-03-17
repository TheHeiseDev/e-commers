import { Link } from "react-router-dom";
import { SignIn } from "../../components/Auth/SignIn/SignIn";

const LoginPage = () => {
  return (
    <div>
      <h1>Логин</h1>
      <SignIn />
      <p>
        Или <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
};
export default LoginPage;
