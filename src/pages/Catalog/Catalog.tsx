import "./Catalog.css";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/store";
import { fetchAllFurnitures } from "store/slice/filterSlice/filterThunk";
import {
  selectAllFurniture,
  selectAllFurnitureData,
  setCurrentPage,
} from "store/slice/filterSlice/filterSlice";

import CatalogItem from "components/CatalogItem/CatalogItem";
import FilterCatalog from "components/FilterCatalog/FilterCatalog";
import CatalogSkeleton from "components/CatalogItem/CatalogSkeleton";
import SortPopup from "components/ui/SortPopup/SortPopup";

import { Pagination } from "@mui/material";
import { smoothScroll } from "utils/smoothScroll";
import { useTitle } from "hooks/use-title";

const Catalog = () => {
  const dispatch = useAppDispatch();

  const { data, status } = useSelector(selectAllFurniture);
  const { currentPage, category, sort, filter, installment, manufacturer } =
    useSelector(selectAllFurnitureData);

  const setPageHandle = (page: number) => {
    smoothScroll(500);
    dispatch(setCurrentPage(page));
  };

  useEffect(() => {
    smoothScroll(500);
  }, []);

  //Request data on first render
  useEffect(() => {
    const queryParams = {
      currentPage: currentPage,
      sortBy: sort.sortBy.replace("-", ""),
      order: sort.sortBy.includes("-") ? "asc" : "desc",
      category: category,
      filter: filter,
      installment: installment,
      manufacturer: manufacturer,
    };
    dispatch(fetchAllFurnitures(queryParams));
  }, [currentPage, sort.sortBy]);

  useTitle("Каталог товаров");

  return (
    <div className="catalog">
      <div className="catalog__tags">Теги</div>

      <div className="catalog__container">
        <FilterCatalog />
        <div className="catalog__wrapper">
          <div>
            <SortPopup sortObj={{ name: "Популярности", sortBy: "rating" }} />
          </div>
          {status === "success" ? (
            data?.map((item) => <CatalogItem key={item.id} item={item} />)
          ) : status === "loading" ? (
            [...Array(4)].map((_, index) => (
              <div key={index} className="skeleton__wrapper">
                <CatalogSkeleton />
              </div>
            ))
          ) : status === "error" ? (
            <h2>Ошибка загрузки данных...</h2>
          ) : null}

          {data && data?.length >= 4 && (
            <Pagination
              className="catalog__pagination"
              count={2}
              page={currentPage}
              onChange={(_, num) => setPageHandle(num)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;