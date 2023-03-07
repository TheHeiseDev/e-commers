import React from "react";
import "./OrderItem.css";
import { AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteOrder } from "../../redux/slice/orderSlice";

const OrderItem = ({ item }) => {
  const dispatch = useDispatch();

  const handleCartRemove = () => {
    dispatch(deleteOrder(item.id));
  };

  return (
    <div className="order__item-wrapper">
      <div className="cart-thead">
        <div className="cart-thead__provider">Столплит – 1 товар</div>
        <div className="cart-thead__price">Цена</div>
        <div className="cart-thead__count">Кол-во</div>
        <div className="cart-thead__sum">Сумма</div>
      </div>

      <div className="product__cart">
        <div className="product__cart-link">
          <div className="product-cart__img">
            <div>
              <img src={item.imageUrl} alt={item.title} />
            </div>
          </div>
          <div className="product-cart__info">
            <Link to={`/furniture/${item.id}`}>
              <h4 className="pbinfo__title">
                <span>{item.title}</span>
              </h4>
            </Link>
          </div>
        </div>

        <div className="product-cart__price">
          <div className="cart-price__flex_order">
            {item.oldPrice && (
              <div className="price--old">
                <span className="mobile--info">Старая цена:</span>
                {item.oldPrice} $
              </div>
            )}
            <div className="price--current">
              <span className="mobile--info">Цена:</span>
              {item.price} $
            </div>
          </div>
        </div>
        <div className="product-cart__count">
          <div className="count-buttons">
            <span className="mobile--info">Кол-во:</span>
            <span className="count-buttons__input">2шт.</span>
          </div>
        </div>
        <div className="product-cart__sum">
          <div className="price--current">
            <span className="mobile--info">Итого: </span>
            12 380 Р.
          </div>
        </div>
        <button onClick={handleCartRemove} className="product__delete">
          <AiFillDelete />
          Удалить
        </button>
      </div>
    </div>
  );
};

export default OrderItem;
