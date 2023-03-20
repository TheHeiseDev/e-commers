import "./Form.css";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { selectUserError } from "../../../store/slice/userSlice/userSlice";

import Loader from "../Loader/Loader";
import AuthAlert from "../Alerts/AuthAlert/AuthAlert";

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
  const [showPassword, setShowPassword] = useState(true);
  const error = useSelector(selectUserError);
  const inputRef = useRef(null);
  const showButtonRef = useRef(null);

  const handleClickEvent = (event: MouseEvent) => {
    const pathInput = inputRef.current && event.composedPath().includes(inputRef.current);
    const pathButton =
      showButtonRef.current && event.composedPath().includes(showButtonRef.current);

    if (!pathInput && !pathButton) {
      setShowPassword(false);
    }
  };



  // Closing the pop-up when clicking on body and when clicking on escape
  useEffect(() => {
    document.body.addEventListener("click", handleClickEvent);

    return () => {
      document.body.removeEventListener("click", handleClickEvent);
    };
  }, []);

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
          ref={inputRef}
          type={showPassword ? "text" : "password"}
          value={pass}
          onChange={(e) => setPass(e.target.value)}
          placeholder="password"
        />
        <div
          ref={showButtonRef}
          onClick={() => setShowPassword(!showPassword)}
          className="form__svg"
        >
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
