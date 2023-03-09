import React from "react";
import "./Order.css";
import { FaTrash } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../redux/slice/orderSlice/orderSlice";
import { FurnitureType } from "../../redux/slice/furnitureSlice/furnitueTypes";

type OrderProps = {
  item: FurnitureType;
  closeMenu: (toogle: boolean) => void;
  closeMenuMobile: (toogle: boolean) => void;
};

const Order = ({ item, closeMenu, closeMenuMobile }: OrderProps) => {
  const dispatch = useDispatch();

  const onRemove = () => {
    dispatch(deleteOrder(item.id));
  };

  const handlerCloseMenu = () => {
    const checkWindowWidth = window.innerWidth;

    if (checkWindowWidth > 500) {
      closeMenu(false);
    } else {
      closeMenuMobile(false);
    }
  };

  return (
    <div className="item">
      <div className="item-box">
        <Link to={`furniture/${item.id}`}>
          <img src={item.imageUrl} alt="order" />
        </Link>

        <div>
          <Link to={`furniture/${item.id}`}>
            <h2 onClick={handlerCloseMenu}>{item.title}</h2>
          </Link>

          <b>{item.price} $</b>
        </div>
      </div>
      <FaTrash onClick={onRemove} className="delete-icon" />
    </div>
  );
};

export default Order;
