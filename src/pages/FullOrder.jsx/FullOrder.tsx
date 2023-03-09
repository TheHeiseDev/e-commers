import React from "react";
import "./FullOrder.css";
import OrderItem from "../../components/OrderItem/OrderItem";
import { useSelector } from "react-redux";
import { selectOrderData } from "../../redux/slice/orderSlice/orderSlice";

const FullOrder = () => {
  const order = useSelector(selectOrderData);
  const totalPrice = order
    .reduce((sum, acc) => Number(acc.price) * Number(acc.count) + sum, 0)
    .toFixed(2);

  React.useEffect(() => {
    document.title = "Корзина";
  }, []);

  if (order.length <= 0) {
    return <h1>Корзина пустая</h1>;
  }

  return (
    <div className="">
      <h2 className="order__title">Корзина покупок</h2>

      <div className="order__container">
        <div className="order__wrapper">
          {order.map((order) => (
            <OrderItem key={order.id} item={order} />
          ))}
        </div>
        <div className="order__summary">
          <div className="order__summary-title">Сводка заказа</div>
          <div className="order__summary-info">
            <div className="info__total-count">
              <span>Количество товаров: </span>
              <span>{order.length} </span>
            </div>
            <div className="info__total-price">
              <span>Стоимость товаров: </span>
              <span>{totalPrice} $</span>
            </div>
          </div>
          <div className="order__summary-action">
            <p>Итоговая стоимость</p>
            <span> {totalPrice} $</span>

            <div className="order__action">
              <button className="pay--is__auth">Оформить заказ</button>
              <button className="pay--is__sign">Оформить заказ без регистрации</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FullOrder;
