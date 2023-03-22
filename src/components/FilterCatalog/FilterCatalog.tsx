import "./FilterCatalog.css";
import { useEffect, useState } from "react";
import InputCategory from "components/ui/Input/InputCategory";
import SwitchLabels from "components/ui/Toogle/Toogle";
import { useAppDispatch } from "store/store";
import { fetchAllFurnitures } from "store/slice/filterSlice/filterThunk";
import { setCategiesName, setManufacturerName } from "utils/TranslationOfMeanings";
import { filterCategoires, filterManufacturers } from "constants/catalogFilterItem";

const FilterCatalog = () => {
  const dispatch = useAppDispatch();
  const [categoryValue, setCategoryValue] = useState("");
  const [pageValue, setPageValue] = useState(1);
  const [installmentValue, setInstallmentValue] = useState<boolean>(false);

  const handleClearFilter = () => {
    setCategoryValue("");
    setInstallmentValue(false);
  };

  useEffect(() => {
    const category = `&filter=${categoryValue}`;
    const installment = `&Installment=${installmentValue ? installmentValue : ""}`;
    const page = `&page=${pageValue}&limit=4`;

    dispatch(fetchAllFurnitures({ page, category, installment }));
  }, [categoryValue, installmentValue, pageValue]);

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
