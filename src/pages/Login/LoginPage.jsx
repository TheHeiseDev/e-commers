import { Link } from "react-router-dom";

 const LoginPage = () => {
  return (
    <div>
      <h1>Логин</h1>
      {/* <Login /> */}
      <p>
        Или <Link to="/register">Регистрация</Link>
      </p>
    </div>
  );
};
export default LoginPage