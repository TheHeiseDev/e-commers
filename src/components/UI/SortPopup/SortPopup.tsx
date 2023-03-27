import "./SortPopup.css";
import { FC, memo, useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/store";
import { fetchAllFurnitures } from "store/slice/filterSlice/filterThunk";
import { selectAllFurnitureData, setSort } from "store/slice/filterSlice/filterSlice";
import { Sort } from "store/slice/filterSlice/filterTypes";
import SvgTriangle from "../SVG/SvgTriangle";
import { sortList } from "constants/sortList";
import qs from "qs";
import { useNavigate } from "react-router-dom";

interface ISortPopupProps {
  sortObj: Sort;
}

const SortPopup: FC<ISortPopupProps> = memo(({ sortObj }) => {
  const dispatch = useAppDispatch();
  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const { sort, currentPage, category, manufacturer, installment, filter } =
    useSelector(selectAllFurnitureData);

  const onClickSortListItem = (sortObj: any) => {
    const queryParms = {
      currentPage: currentPage,
      filter: filter,
      installment: installment,
      manufacturer: manufacturer,
      category: category,
      sortBy: sortObj.sortBy.replace("-", ""),
      order: sortObj.sortBy.includes("-") ? "asc" : "desc",
    };
    dispatch(setSort(sortObj));
    dispatch(fetchAllFurnitures(queryParms));

    setOpen(false);
  };
  const handleSort = () => {
    setOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickEvent = (event: MouseEvent) => {
      const path = sortRef.current && event.composedPath().includes(sortRef.current);
      if (!path) {
        setOpen(false);
      }
    };

    const handleKeyEvent = (event: KeyboardEvent) => {
      let path = sortRef.current && event.composedPath().includes(sortRef.current);
      if (event.key === "Escape") {
        if (!path) {
          setOpen(false);
        }
      }
    };
    document.body.addEventListener("click", handleClickEvent);
    document.body.addEventListener("keydown", handleKeyEvent);

    return () => {
      document.body.removeEventListener("click", handleClickEvent);

      document.body.removeEventListener("keydown", handleKeyEvent);
    };
  }, []);

  return (
    <div ref={sortRef} className={`sort ${open ? "active" : ""}`}>
      <div onClick={() => setOpen(!open)} className="sort__label">
        <span onClick={handleSort}>{sort.name}</span>
        <SvgTriangle />
      </div>

      {open && (
        <div className="sort__popup">
          <ul>
            {sortList.map((obj) => (
              <li
                key={obj.sortBy}
                onClick={() => onClickSortListItem(obj)}
                className={sortObj.sortBy === obj.sortBy ? "active" : ""}
              >
                {obj.name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});

export default SortPopup;
