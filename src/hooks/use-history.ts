import { useSelector } from "react-redux";
import { useAppDispatch } from "store/store";
import { selectHistory, setHistory } from "store/slice/historySlice /historySlice";

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
