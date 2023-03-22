import "./Catalog.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import CatalogItem from "components/CatalogItem/CatalogItem";
import InputCategory from "components/ui/Input/InputCategory";
import Loader from "components/ui/Loader/Loader";
import RangeSlider from "components/ui/Range/Range";
import SwitchLabels from "components/ui/Toogle/Toogle";

import { useAppDispatch } from "store/store";
import { selectFurnitureAllData } from "store/slice/furnitureSlice/furnitureSlice";
import { fetchFurnitures } from "store/slice/furnitureSlice/furnitureThunk";

import { setCategiesName, setManufacturerName } from "utils/TranslationOfMeanings";

const filterCategoires = ["sofa", "tables", "chairs"];
const filterManufacturers = ["Ukraine", "France", "Germany", "Italy"];

const Catalog = () => {
  const dispatch = useAppDispatch();
  const [categoryValue, setCategoryValue] = useState("");
  const { data } = useSelector(selectFurnitureAllData);
  const postLimit = 8;

  useEffect(() => {
    const category = `&filter=${categoryValue}`;

    dispatch(fetchFurnitures({ category, postLimit }));
  }, [categoryValue, postLimit]);

  if (!data) {
    return <Loader />;
  }
  return (
    <div className="catalog">
      <div className="catalog__tags">Теги</div>
      <div className="catalog__container">
        <div className="catalog__params">
          <div className="filter__categories">
            <div className="catalog__filter-title">
              <b>Категории</b>
            </div>
            {filterCategoires.map((categoryName, index) => (
              <div key={index}>
                <InputCategory
                  ckecked={categoryValue === categoryName}
                  categoryName={setCategiesName(categoryName)}
                  handleSetCategory={() => setCategoryValue(categoryName)}
                />
              </div>
            ))}
          </div>

          <div className="filter__manufacturer">
            <div className="catalog__filter-title">
              <b>Производитель</b>
            </div>

            {filterManufacturers.map((manufacturer, index) => (
              <div key={index}>
                <InputCategory
                  ckecked={categoryValue === manufacturer}
                  categoryName={setManufacturerName(manufacturer)}
                  handleSetCategory={() => setCategoryValue(manufacturer)}
                />
              </div>
            ))}
          </div>

          <div className="filter__installment">
            <div className="catalog__filter-title">
              <b>В Рассрочку</b>
            </div>

            <div className="category__item">
              <SwitchLabels />
            </div>
          </div>

          <div className="filter__price">
            <div className="catalog__filter-title">
              <b>Цена</b>
            </div>

            <div className="category__item">
              <RangeSlider />
            </div>
          </div>
        </div>
        <div className="catalog__wrapper">
          {data.map((item) => (
            <CatalogItem key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Catalog;
