import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { addOrder } from "../../redux/slice/orderSlice";
import "./FurnitureItem.css";
import VerifiedIcon from "@mui/icons-material/Verified"; // товар в наличии

const FurnitureItem = ({ item }) => {
  const orders = useSelector((state) => state.order.items);
  const dispatch = useDispatch();

  const checkItemInCart = orders.some((order) => order.id === item.id);

  const onAdd = () => {
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
      <div onClick={onAdd} className={`add-to-cart ${checkItemInCart ? "active" : ""} `}>
        +
      </div>
    </div>
  );
};

export default FurnitureItem;
