import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { addOrder, selectOrderData } from "../../store/slice/orderSlice/orderSlice";
import "./FurnitureItem.css";
import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии
import FavoriteIcon from "@mui/icons-material/Favorite"; //избранное
import { FurnitureType } from "../../store/slice/furnitureSlice/furnitueTypes";
import { searchCardInBasket } from "../../utils/searchCardInBasket";
import { addFavorite } from "../../store/slice/favoriteSlice/favoriteSlice";
import { useFavorite } from "../../hooks/use-favorite";
import { useAuth } from "../../hooks/use-auth";

interface IFurnitureItemProps {
  item: FurnitureType;
}

const FurnitureItem = memo(({ item }: IFurnitureItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const orders = useSelector(selectOrderData);

  // Search for item in cart, if item found then get true, else false
  const checkItemInCart = searchCardInBasket(orders, item);

  const isFavorite = useFavorite(item);
  const { isAuth } = useAuth();

  const onAddToCart = () => {
    dispatch(addOrder(item));
  };
  const onAddToFavorite = () => {
    if (isAuth) {
      dispatch(addFavorite(item));
    } else {
      navigate("login", { replace: false });
      window.scrollTo(0, 0);
    }
  };

  return (
    <div className="item">
      <div className="item__picture">
        <Link to={`/furniture/${item.id}`}>
          <img src={item.imageUrl} alt="product" />
        </Link>
        <div className="item__instock">
          <VerifiedIcon className={item.itemInStock ? "" : "inStock"} />
          <div>{item.itemInStock ? "Есть в наличии" : "Нет в наличии"} </div>
        </div>

        <div onClick={onAddToFavorite} className="item__infavorite">
          <FavoriteIcon className={`favorite ${isFavorite ? "isFavorite" : ""}`} />
        </div>
      </div>
      <Link to={`/furniture/${item.id}`}>
        <h2>{item.title}</h2>
      </Link>
      <p>{item.desc}</p>
      <b>{item.price} $</b>
      <div
        onClick={onAddToCart}
        className={`add-to-cart ${checkItemInCart ? "active" : ""} `}
      >
        +
      </div>
    </div>
  );
});

export default FurnitureItem;
