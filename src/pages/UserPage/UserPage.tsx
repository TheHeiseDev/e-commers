import React from "react";
import "./UserPage.css";
import { removeUser, selectUser } from "../../store/slice/userSlice/userSlice";
import { useAppDispatch } from "../../store/store";
import { clearLocalStorage } from "../../utils/saveInLocalStorage";
import { useSelector } from "react-redux";
import { useTitle } from "../../hooks/use-title";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { email } = useSelector(selectUser);
  useTitle("Личный кабинет")

  const handleExit = () => {
    dispatch(removeUser());
    clearLocalStorage();
  };
  return (
    <div className="user__wrapper">
      <h1>UserPage</h1>
      <div>
        <p>Email: {email}</p>
      </div>
      <button onClick={handleExit}>Выйти</button>
    </div>
  );
};

export default UserPage;
