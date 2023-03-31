import "./CatalogItem.css";
import { useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { useAppDispatch } from "store/store";
import { FurnitureType } from "store/slice/furnitureSlice/furnitueTypes";
import { addFavorite } from "store/slice/favoriteSlice/favoriteSlice";
import { addOrder, selectOrderData } from "store/slice/orderSlice/orderSlice";

import FavoriteIcon from "@mui/icons-material/Favorite"; //избранное
import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии
import { useFavorite } from "hooks/use-favorite";
import { useAuth } from "hooks/use-auth";
import { useHistory } from "hooks/use-history";

import { searchCardInBasket } from "utils/searchCardInBasket";
import { setCategiesName, setManufacturerName } from "utils/TranslationOfMeanings";

interface ICatalogItem {
  item: FurnitureType;
}
const CatalogItem = ({ item }: ICatalogItem) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const orders = useSelector(selectOrderData);

  const checkItemInCart = searchCardInBasket(orders, item);
  const isFavorite = useFavorite(item);
  const { isAuth } = useAuth();
  const { setPathname } = useHistory();

  const onAddToFavorite = () => {
    if (isAuth) {
      dispatch(addFavorite(item));
    } else {
      setPathname(pathname);
      navigate("/login", { replace: false });
      window.scrollTo(0, 0);
    }
  };
  const onAddToCart = () => {
    if (item) {
      dispatch(addOrder(item));
    }
  };

  return (
    <div className="catalogItem__wrapper">
      <div className="catalogItem__image">
        <Link to={`/furniture/${item.id}`}>
          <img src={item.imageUrl} alt={item.title} />
        </Link>
      </div>
      <div className="catalogItem__info">
        <Link to={`/furniture/${item.id}`}>
          <h3> {item.title} </h3>
        </Link>
        <div>
          Производитель: <span>{setManufacturerName(item.Manufacturer)}</span>
        </div>
        <div>
          Категория: <span>{setCategiesName(item.category)}</span>
        </div>
        <div>
          Весь: <span>{item.Weight} кг.</span>
        </div>
        <div>
          Рассрочка: <span>{item.Installment === true ? "12 месяцев" : "Нет"}</span>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          В наличии:{" "}
          {item.itemInStock ? (
            <VerifiedIcon style={{ fill: "green" }} />
          ) : (
            <span>Нет</span>
          )}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
          <svg
            style={{ color: "rgb(255, 184, 0)" }}
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
          >
            <path
              fill="currentColor"
              d="M8 2a1 1 0 0 1 .87.508l1.538 2.723 2.782.537a1 1 0 0 1 .538 1.667L11.711 9.58l.512 3.266A1 1 0 0 1 10.8 13.9L8 12.548 5.2 13.9a1 1 0 0 1-1.423-1.055l.512-3.266-2.017-2.144a1 1 0 0 1 .538-1.667l2.782-.537 1.537-2.723A1 1 0 0 1 8 2Z"
            ></path>
          </svg>
          <span style={{ color: "#707f8d" }}>{item.rating}</span>
        </div>
      </div>
      <div className="catalogItem__price">
        <div className="catalog-price">
          <span className="catalog-price-price">{item.price} $</span>
          {item.oldPrice && <span className="catalog-price-old">{item.oldPrice} $</span>}
        </div>
        <div className="catalogItem__action ">
          <button onClick={onAddToCart}>
            {checkItemInCart ? "Из корзины" : "В корзину"}
          </button>
          <div onClick={onAddToFavorite} className="catalog__favorite">
            <FavoriteIcon className={`favorite ${isFavorite ? "isFavorite" : ""}`} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CatalogItem;
