import "./FullFavorite.css";
import { useSelector } from "react-redux";
import { useAppDispatch } from "store/store";
import { clearFavorites, selectFavorite } from "store/slice/favoriteSlice/favoriteSlice";

import FurnitureItem from "components/FurnitureItem/FurnitureItem";
import { AiFillDelete } from "react-icons/ai";

const FullFavorite = () => {
  const favorites = useSelector(selectFavorite);
  const dispatch = useAppDispatch();

  const handleClear = () => {
    dispatch(clearFavorites());
  };

  if (favorites.length < 1) {
    return <h2>Добавьте товары в избранное...</h2>;
  }
  return (
    <div className="favorite__wrapper">
      <div className="favorite__title-block">
        <h2>Избранное</h2>
        <button onClick={handleClear} className="favorite__clear">
          <AiFillDelete />
          Очистить избранное
        </button>
      </div>
      <div className="furniture__wrapper-item">
        {favorites.map((favorite) => (
          <FurnitureItem key={Number(favorite.id)} item={favorite} />
        ))}
      </div>
    </div>
  );
};

export default FullFavorite;
// [...Array(4)].map((_, index) => <FurnitureSkeleton key={index} />)
