import { useSelector } from "react-redux";
import { selectFurnitureData } from "../../redux/slice/furnitureSlice/furnitureSlice";
import FurnitureItem from "../FurnitureItem/FurnitureItem";
import FurnitureSkeleton from "../FurnitureItem/FurnitureSkeleton";
import "./FurnitureList.css";

interface FurnitureListProps  {
  handlePostLimitCart: () => void;
};

const FurnitureList = ({ handlePostLimitCart }: FurnitureListProps) => {
  const { items, status } = useSelector(selectFurnitureData);

  return (
    <main className="furniture__wrapper">
      <div className="furniture__wrapper-item">
        {status === "loading" ? (
          [...Array(4)].map((_, index) => <FurnitureSkeleton key={index} />)
        ) : status === "success" ? (
          items.map((item) => <FurnitureItem key={Number(item.id)} item={item} />)
        ) : (
          <>
            <h4>Ошибка загрузки данных...</h4>
          </>
        )}
      </div>
      <div className="button__wrapper">
        {items.length < 8 && items.length >= 4 && (
          <button onClick={handlePostLimitCart}>Показать еще</button>
        )}
      </div>
    </main>
  );
};

export default FurnitureList;
