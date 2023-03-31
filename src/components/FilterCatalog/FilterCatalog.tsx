import "./FilterCatalog.css";
import { useEffect, useState } from "react";
import { useAppDispatch } from "store/store";
import {
  setCategory,
  setInstallment,
  setManufacturer,
  setSort,
} from "store/slice/filterSlice/filterSlice";
import InputCategory from "components/UI/Input/InputCategory";
import SwitchLabels from "components/UI/Toogle/Toogle";
import SvgTriangle from "components/UI/SVG/SvgTriangle";
import { setCategiesName, setManufacturerName } from "utils/TranslationOfMeanings";
import { filterCategoires, filterManufacturers } from "constants/catalogFilterItem";

const FilterCatalog = () => {
  const dispatch = useAppDispatch();
  const [filterToogle, setFilterToogle] = useState(false);
  const [categoryValue, setCategoryValue] = useState<string>("");
  const [manufacturerValue, setManufacturerValue] = useState<string>("");
  const [installmentValue, setInstallmentValue] = useState<boolean>(false);

  // Reset all filter properties to default
  const handleClearFilter = () => {
    setCategoryValue("");
    setManufacturerValue("");
    setInstallmentValue(false);
    dispatch(setSort({ name: "Популярности", sortBy: "" }));
  };

  // Setting filter options
  useEffect(() => {
    dispatch(setCategory(categoryValue));
    dispatch(setInstallment(installmentValue));
    dispatch(setManufacturer(manufacturerValue));
  }, [categoryValue, installmentValue, manufacturerValue]);

  return (
    <>
      <button
        className={`filter__toogle-btn ${filterToogle ? "active" : ""}`}
        onClick={() => setFilterToogle(!filterToogle)}
      >
        Фильтры
        <SvgTriangle />
      </button>
      <div className={`catalog__params ${filterToogle ? "active" : ""}`}>
        <div className="filter__categories">
          <div className="catalog__filter-title">
            <b>Категории</b>
          </div>
          {filterCategoires.map((categoryName, index) => (
            <div key={index} onClick={() => setFilterToogle(false)}>
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
            <div key={index} onClick={() => setFilterToogle(false)}>
              <InputCategory
                ckecked={manufacturer === manufacturerValue}
                categoryName={setManufacturerName(manufacturer)}
                handleSetCategory={() => setManufacturerValue(manufacturer)}
              />
            </div>
          ))}
        </div>

        <div className="filter__installment">
          <div className="catalog__filter-title">
            <b>В Рассрочку</b>
          </div>

          <div className="category__item">
            <SwitchLabels
              onChecked={installmentValue}
              onChange={() => setInstallmentValue(!installmentValue)}
            />
          </div>
        </div>

        <div className="filter__clear">
          <button onClick={handleClearFilter}>Сбросить фильтры</button>
        </div>
      </div>
    </>
  );
};

export default FilterCatalog;
