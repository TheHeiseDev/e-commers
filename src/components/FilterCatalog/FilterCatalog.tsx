import "./FilterCatalog.css";
import { useEffect, useState } from "react";
import InputCategory from "components/ui/Input/InputCategory";
import SwitchLabels from "components/ui/Toogle/Toogle";
import { useAppDispatch } from "store/store";
import { fetchAllFurnitures } from "store/slice/filterSlice/filterThunk";
import { setCategiesName, setManufacturerName } from "utils/TranslationOfMeanings";
import { filterCategoires, filterManufacturers } from "constants/catalogFilterItem";
import { useSelector } from "react-redux";
import {
  selectAllFurnitureData,
  setCategory,
  setInstallment,
  setManufacturer,
} from "store/slice/filterSlice/filterSlice";
import qs from "qs";
import { useNavigate } from "react-router-dom";
const FilterCatalog = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [categoryValue, setCategoryValue] = useState("");
  const [manufacturerValue, setManufacturerValue] = useState("");
  const [installmentValue, setInstallmentValue] = useState<boolean>(false);
  const { currentPage, category, sort, filter, installment, manufacturer } =
    useSelector(selectAllFurnitureData);

  const handleClearFilter = () => {
    setCategoryValue("");
    setManufacturerValue("");
    setInstallmentValue(false);
  };

  //Запрос данных при первом рендере
  useEffect(() => {
    const queryParams = {
      sortBy: sort.sortBy,
      category: categoryValue,
      filter: filter,
      currentPage: currentPage,
      order: sort.sortBy.includes("-") ? "asc" : "desc",
      installment: installmentValue,
      manufacturer: manufacturerValue,
    };
    dispatch(fetchAllFurnitures(queryParams));
    dispatch(setCategory(categoryValue));
    dispatch(setInstallment(installmentValue));
    dispatch(setManufacturer(manufacturerValue));
  }, [categoryValue, filter, installmentValue, manufacturerValue]);

  useEffect(() => {
    if (window.location.search) {
      const queryString = qs.stringify({
        sortBy: sort.sortBy,
        category: category,
        filter: filter,
        page: currentPage,
        installment: installment,
        manufacturer: manufacturer,
      });
      navigate(`?${queryString}`);
    }
  }, [category, filter, currentPage, sort.sortBy, installment, manufacturer]);

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
