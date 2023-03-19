import "./Form.css";
import { useState } from "react";
import Loader from "../Loader/Loader";
import AuthAlert from "../Alerts/AuthAlert/AuthAlert";
import { useSelector } from "react-redux";
import { selectUserError } from "../../../store/slice/userSlice/userSlice";
import { BsEyeFill } from "react-icons/bs";
import { BsEyeSlashFill } from "react-icons/bs";

interface IForm {
  title: string;
  handleClick: (email: string, pass: string) => void;
  loading: boolean;
}
export const Form = ({ title, handleClick, loading }: IForm) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const error = useSelector(selectUserError);

  return (
    <div className="form-auth__wrapper">
      <AuthAlert title={error?.message} display={error?.status} />
      <input
        className="form-auth__email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <div className="form-auth__pass">
        <input
          type={showPassword ? "text" : "password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />
        <div onClick={() => setShowPassword(!showPassword)} className="form__svg">
          {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
        </div>
      </div>

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
