import "./FurnitureItem.css";
import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии
import FavoriteIcon from "@mui/icons-material/Favorite"; //избранное

import { searchCardInBasket } from "utils/searchCardInBasket";

import { addOrder, selectOrderData } from "store/slice/orderSlice/orderSlice";
import { FurnitureType } from "store/slice/furnitureSlice/furnitueTypes";
import { addFavorite } from "store/slice/favoriteSlice/favoriteSlice";

import { useAuth } from "hooks/use-auth";
import { useHistory } from "hooks/use-history";
import { useFavorite } from "hooks/use-favorite";

interface IFurnitureItemProps {
  item: FurnitureType;
}

const FurnitureItem = memo(({ item }: IFurnitureItemProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const orders = useSelector(selectOrderData);
  const { pathname } = useLocation();

  const isFavorite = useFavorite(item);
  const { isAuth } = useAuth();
  const { setPathname } = useHistory();

  // Search for item in cart, if item found then get true, else false
  const checkItemInCart = searchCardInBasket(orders, item);

  const onAddToCart = () => {
    dispatch(addOrder(item));
  };
  const onAddToFavorite = () => {
    if (isAuth) {
      dispatch(addFavorite(item));
    } else {
      setPathname(pathname);
      navigate("/login", { replace: false });
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
