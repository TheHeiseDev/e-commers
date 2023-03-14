import { useSelector } from "react-redux";
import { selectFurnitureAllData } from "../../store/slice/furnitureSlice/furnitureSlice";
import FurnitureItem from "../FurnitureItem/FurnitureItem";
import FurnitureSkeleton from "../FurnitureItem/FurnitureSkeleton";
import "./FurnitureList.css";

interface IFurnitureListProps {
  handlePostLimitCart: () => void;
}

const FurnitureList = ({ handlePostLimitCart }: IFurnitureListProps) => {
  const { data, status } = useSelector(selectFurnitureAllData);

  return (
    <main className="furniture__wrapper">
      <div className="furniture__wrapper-item">
        {status === "loading" || data === null ? (
          [...Array(4)].map((_, index) => <FurnitureSkeleton key={index} />)
        ) : status === "success" ? (
          data.map((item) => <FurnitureItem key={Number(item.id)} item={item} />)
        ) : (
          <>
            <h4>Ошибка загрузки данных...</h4>
          </>
        )}
      </div>
      <div className="button__wrapper">
        {data && data.length < 8 && data.length >= 4 && (
          <button onClick={handlePostLimitCart}>Показать еще</button>
        )}
      </div>
    </main>
  );
};

export default FurnitureList;
