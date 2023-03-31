import "./OrderItem.css";
import { memo } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { FurnitureType } from "../../store/slice/furnitureSlice/furnitueTypes";
import {
  deleteOrder,
  minusOrderCount,
  plusOrderCount,
} from "../../store/slice/orderSlice/orderSlice";
import { IoRemoveCircleOutline } from "react-icons/io5";
import { IoAddCircleOutline } from "react-icons/io5";
import { AiFillDelete } from "react-icons/ai";

interface IOrderItemProps {
  item: FurnitureType;
}
const OrderItem = memo(({ item }: IOrderItemProps) => {
  const dispatch = useDispatch();
  const totalSum = (item.count! * Number(item.price)).toFixed(2);

  const handleCartRemove = () => {
    dispatch(deleteOrder(item.id));
  };
  const plusProductCount = () => {
    dispatch(plusOrderCount(item.productCode));
  };
  const minusProductCount = () => {
    dispatch(minusOrderCount(item.productCode));
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
            <div className="price--current">
              <span className="mobile--info">Цена:</span>
              {item.price} $
            </div>
            {item.oldPrice && (
              <div className="price--old">
                <span className="mobile--info">Старая цена:</span>
                {item.oldPrice} $
              </div>
            )}
          </div>
        </div>
        <div className="product-cart__count">
          <div className="count-buttons">
            <span className="mobile--info">Кол-во:</span>
            <IoRemoveCircleOutline onClick={minusProductCount} />

            <span className="count-buttons__input">{item.count}шт.</span>

            <IoAddCircleOutline onClick={plusProductCount} />
          </div>
        </div>
        <div className="product-cart__sum">
          <div className="price--current">
            <span className="mobile--info">Итого: </span>
            {totalSum} $
          </div>
        </div>
        <button onClick={handleCartRemove} className="product__delete">
          <AiFillDelete />
          Удалить
        </button>
      </div>
    </div>
  );
});

export default OrderItem;
