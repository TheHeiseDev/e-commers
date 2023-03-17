import "./LoginPage.css";
import { Link } from "react-router-dom";
import { SignIn } from "../../components/Auth/SignIn/SignIn";

const LoginPage = () => {
  return (
    <div className="loginpage__wrapper">
      <h1>Авторизация</h1>
      <SignIn />
      <p>
        или <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
};
export default LoginPage;
