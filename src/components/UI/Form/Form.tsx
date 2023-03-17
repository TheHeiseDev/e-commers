import { useState, CSSProperties } from "react";

const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  width: "300px",
  margin: "0 auto",
};

interface IForm {
  title: string;
  handleClick: (email: string, pass: string) => void;
}
export const Form = ({ title, handleClick }: IForm) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  return (
    <div style={formStyle}>
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
      <button onClick={() => handleClick(email, pass)}>{title}</button>
    </div>
  );
};
