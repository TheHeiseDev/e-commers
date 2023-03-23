import "./SortPopup.css";
import { FC, memo, useState, useEffect, useRef } from "react";
import { useAppDispatch } from "store/store";
import { fetchAllFurnitures } from "store/slice/filterSlice/filterThunk";
import { Sort } from "store/slice/filterSlice/filterTypes";
import SvgTriangle from "../SVG/SvgTriangle";
import { sortList } from "constants/sortList";

import qs from "qs";

interface ISortPopupProps {
  sortObj: Sort;
}

const SortPopup: FC<ISortPopupProps> = memo(({ sortObj }) => {
  const dispatch = useAppDispatch();

  const sortRef = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);

  const onClickSortListItem = (sortType: any) => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1));

      const qeueryParams = {
        sortBy: sortType.sortBy.replace("-", ""),
        category: String(params.category),
        currentPage: Number(params.page),
        filter: String(params.filter),
        installment: Boolean(params.installment),
        manufacturer: String(params.manufacturer),
        order: sortType.sortBy.includes("-") ? "asc" : "desc",
      };
      dispatch(fetchAllFurnitures(qeueryParams));
    } else {
      const qeueryParams = {
        sortBy: sortType.sortBy.replace("-", ""),
        category: "",
        currentPage: 1,
        filter: "",
        installment: false,
        manufacturer: "",
        order: sortType.sortBy.includes("-") ? "asc" : "desc",
      };
      dispatch(fetchAllFurnitures(qeueryParams));
    }

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
      <div onClick={() => setOpen(true)} className="sort__label">
        <span onClick={handleSort}>Сортировка по</span>
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
