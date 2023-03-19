import "./Form.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import AuthAlert from "../Alerts/AuthAlert/AuthAlert";
import { useSelector } from "react-redux";
import { selectUserError } from "../../../store/slice/userSlice/userSlice";

interface IForm {
  title: string;
  handleClick: (email: string, pass: string) => void;
  loading: boolean;
}
export const Form = ({ title, handleClick, loading }: IForm) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const error = useSelector(selectUserError);

  return (
    <div className="form-auth__wrapper">
      <AuthAlert title={error?.message} display={error?.status} />
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button
        className={loading ? "active" : ""}
        onClick={() => handleClick(email, pass)}
      >
        <span className="form-auth__button-titile">
          {title} {loading && <Loader />}
        </span>
      </button>
    </div>
  );
};
