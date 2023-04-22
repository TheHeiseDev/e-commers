import "./PopularCategoryList.css";
import PopularBigCard from "./PopularBigCard/PopularBigCard";
import PopularSmallCard from "./PopularSmallCard/PopularSmallCard";
import { populaCategoryAll, populaCategoryBig } from "utils/constants/productCategories";

const PopularCategoryList = () => {
  return (
    <>
      <h2 className="popular__title">Популярные категории</h2>

      <div className="popular__wrapper-big">
        <PopularBigCard item={populaCategoryBig} />
      </div>

      <h2 className="popular__title">Все категории</h2>
      <div className="popular__wrapper-small">
        <PopularSmallCard item={populaCategoryAll} />
      </div>
    </>
  );
};

export default PopularCategoryList;
