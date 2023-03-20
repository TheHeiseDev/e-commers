import { useSelector } from "react-redux";
import { selectHistory, setHistory } from "../store/slice/historySlice /historySlice";
import { useAppDispatch } from "../store/store";

export const useHistory = () => {
  const dispatch = useAppDispatch();
  const history = useSelector(selectHistory);

  const setPathname = (path: string) => {
    if (path) {
      dispatch(setHistory(path));
    }
  };
  const claerHistory = () => {
    dispatch(setHistory(null));
  };

  return {
    history,
    setPathname,
    claerHistory,
  };
};
