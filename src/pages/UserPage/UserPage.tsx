import "./UserPage.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/store";
import { removeUser, selectUser } from "store/slice/userSlice/userSlice";
import { clearFavorites } from "store/slice/favoriteSlice/favoriteSlice";
import { clearLocalStorage } from "utils/saveInLocalStorage";

import { useTitle } from "hooks/use-title";
import { useHistory } from "hooks/use-history";

const UserPage = () => {
  const dispatch = useAppDispatch();
  const { email } = useSelector(selectUser);

  // Before leaving, the visit history is cleared,
  // which is used to return to the current page after authorization
  const { claerHistory } = useHistory();

  // Set the title of the current page
  useTitle("Личный кабинет");

  const handleExit = () => {
    dispatch(removeUser());
    dispatch(clearFavorites());
    clearLocalStorage();
    claerHistory();
  };
  return (
    <div className="user__wrapper">
      <h1>Личный кабинет</h1>
      <div>
        <p>Email: {email}</p>
      </div>
      <button onClick={handleExit}>Выйти</button>
    </div>
  );
};

export default UserPage;
