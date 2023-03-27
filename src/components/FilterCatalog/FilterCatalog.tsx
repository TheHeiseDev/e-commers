import "./FilterCatalog.css";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import InputCategory from "components/ui/Input/InputCategory";
import SwitchLabels from "components/ui/Toogle/Toogle";
import { useAppDispatch } from "store/store";
import { fetchAllFurnitures } from "store/slice/filterSlice/filterThunk";
import { setCategiesName, setManufacturerName } from "utils/TranslationOfMeanings";
import { filterCategoires, filterManufacturers } from "constants/catalogFilterItem";
import {
  selectAllFurnitureData,
  setCategory,
  setInstallment,
  setManufacturer,
  setSort,
} from "store/slice/filterSlice/filterSlice";

const FilterCatalog = () => {
  const dispatch = useAppDispatch();
  const [categoryValue, setCategoryValue] = useState("");
  const [manufacturerValue, setManufacturerValue] = useState("");
  const [installmentValue, setInstallmentValue] = useState<boolean>(false);
  const { sort, currentPage, category, filter, installment, manufacturer } =
    useSelector(selectAllFurnitureData);

  const handleClearFilter = () => {
    setCategoryValue("");
    setManufacturerValue("");
    setInstallmentValue(false);
    dispatch(setSort({ name: "Популярности", sortBy: "" }));
  };

  //Запрос данных при первом рендере
  useEffect(() => {
    const queryParams = {
      sortBy: sort.sortBy.replace("-", ""),
      order: sort.sortBy.includes("-") ? "asc" : "desc",
      category: categoryValue,
      filter: filter,
      currentPage: currentPage,
      installment: installmentValue,
      manufacturer: manufacturerValue,
    };
    dispatch(setCategory(categoryValue));
    dispatch(setInstallment(installmentValue));
    dispatch(setManufacturer(manufacturerValue));
    dispatch(fetchAllFurnitures(queryParams));
  }, [categoryValue, filter, installmentValue, manufacturerValue]);

  return (
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
  );
};

export default FilterCatalog;
