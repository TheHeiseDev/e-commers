import { useSelector } from "react-redux";
import { selectFavorite } from "../store/slice/favoriteSlice/favoriteSlice";
import { FurnitureType } from "../store/slice/furnitureSlice/furnitueTypes";

export const useFavorite = (item: FurnitureType | null) => {
  const favorites = useSelector(selectFavorite);
  const isFavorite =
    item && favorites.some((favorite) => favorite.productCode === item.productCode);
  return isFavorite;
};
