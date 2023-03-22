import "./Catalog.css";
import { useSelector } from "react-redux";
import CatalogItem from "components/CatalogItem/CatalogItem";
import Loader from "components/ui/Loader/Loader";
import FilterCatalog from "components/FilterCatalog/FilterCatalog";
import { useTitle } from "hooks/use-title";
import { selectAllFurniture } from "store/slice/filterSlice/filterSlice";
import { useEffect, useState } from "react";
import { fetchAllFurnitures } from "store/slice/filterSlice/filterThunk";
import { useAppDispatch } from "store/store";
import { Pagination } from "@mui/material";
import CatalogSkeleton from "components/CatalogItem/CatalogSkeleton";

const Catalog = () => {
  const dispatch = useAppDispatch();
  const { data, status } = useSelector(selectAllFurniture);
  const [pageValue, setPageValue] = useState(1);

  useEffect(() => {
    const page = `&page=${pageValue}&limit=4`;
    window.scrollTo(0, 0);
    dispatch(fetchAllFurnitures({ page }));
  }, [pageValue]);

  useTitle("Каталог товаров");

  return (
    <div className="catalog">
      <div className="catalog__tags">Теги</div>
      <div className="catalog__container">
        <FilterCatalog />
        <div className="catalog__wrapper">
          {status === "success" ? (
            data?.map((item) => <CatalogItem key={item.id} item={item} />)
          ) : status === "loading" ? (
            [...Array(4)].map((_, index) => <CatalogSkeleton key={index} />)
          ) : status === "error" ? (
            <h2>Ошибка загрузки данных...</h2>
          ) : null}

          <Pagination
            className="catalog__pagination"
            count={2}
            page={pageValue}
            onChange={(_, num) => setPageValue(num)}
          />
        </div>
      </div>
    </div>
  );
};

export default Catalog;
