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

const tagsListCategory = [
  {
    name: "Популярные стулья",
    path: "chairs",
    sortBy: "rating",
    order: "desc",
  },
  {
    name: "Недорогие диваны",
    path: "sofa",
    sortBy: "price",
    order: "asc",
  },
  {
    name: "Недорогие столы",
    path: "tables",
    sortBy: "price",
    order: "asc",
  },
  {
    name: "Топ рейтингових",
    path: "",
    sortBy: "rating",
    order: "desc",
  },
];
const tagsListCountry = [
  {
    name: "Мебель из Италии",
    path: "Italy",
    sortBy: "",
    order: "",
  },
  {
    name: "Французкиая мебель",
    path: "France",
    sortBy: "",
    order: "",
  },
  {
    name: "Топ из Германии",
    path: "Germany",
    sortBy: "",
    order: "",
  },
];

const Catalog = () => {
  const dispatch = useAppDispatch();

  const { data, status } = useSelector(selectAllFurniture);
  const { currentPage, category, sort, filter, installment, manufacturer } =
    useSelector(selectAllFurnitureData);

  const handleSetPage = (page: number) => {
    smoothScroll(100);
    dispatch(setCurrentPage(page));
  };
  const handleFilterCategory = (tag: any) => {
    const queryParams = {
      currentPage: currentPage,
      sortBy: tag.sortBy,
      order: tag.order,
      category: tag.path,
      filter: filter,
      installment: installment,
      manufacturer: manufacturer,
    };
    dispatch(fetchAllFurnitures(queryParams));
  };
  const handleFilterCountry = (tag: any) => {
    const queryParams = {
      currentPage: currentPage,
      sortBy: tag.sortBy,
      order: tag.order,
      category: category,
      filter: filter,
      installment: installment,
      manufacturer: tag.path,
    };
    dispatch(fetchAllFurnitures(queryParams));
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
  }, [currentPage, category, manufacturer, installment, filter, sort]);

  useTitle("Каталог товаров");

  return (
    <div className="catalog">
      <div className="catalog__tags">
        {tagsListCategory.map((tag, index) => (
          <span onClick={() => handleFilterCategory(tag)} key={index}>
            {tag.name}
          </span>
        ))}
        {tagsListCountry.map((tag, index) => (
          <span onClick={() => handleFilterCountry(tag)} key={index}>
            {tag.name}
          </span>
        ))}
      </div>

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
              onChange={(_, num) => handleSetPage(num)}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
