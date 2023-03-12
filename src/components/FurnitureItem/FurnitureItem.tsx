import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addOrder, selectOrderData } from "../../store/slice/orderSlice/orderSlice";
import "./FurnitureItem.css";
import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии
import { FurnitureType } from "../../store/slice/furnitureSlice/furnitueTypes";
import { searchCardInBasket } from "../../utils/searchCardInBasket";

interface IFurnitureItemProps {
  item: FurnitureType;
}

const FurnitureItem = memo(({ item }: IFurnitureItemProps) => {
  const dispatch = useDispatch();
  const orders = useSelector(selectOrderData);

  // Search for item in cart, if item found then get true, else false
  const checkItemInCart = searchCardInBasket(orders, item);

  const onAddToCart = () => {
    dispatch(addOrder(item));
  };

  return (
    <div className="item">
      <Link to={`/furniture/${item.id}`}>
        <div className="item__picture">
          <img src={item.imageUrl} alt="product" />
          <div className="item__instock">
            <VerifiedIcon className={item.itemInStock ? "" : "inStock"} />
            <div>{item.itemInStock ? "Есть в наличии" : "Нет в наличии"} </div>
          </div>
        </div>

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
