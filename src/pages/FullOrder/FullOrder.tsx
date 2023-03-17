import "./FullOrder.css";
import { useSelector } from "react-redux";
import { selectOrderData } from "../../store/slice/orderSlice/orderSlice";

import OrderItem from "../../components/OrderItem/OrderItem";

import { useTitle } from "../../hooks/use-title";
import { useCalculateTotalPrice } from "../../hooks/use-totalPrice";
import { memo } from "react";

const FullOrder = memo(() => {
  const order = useSelector(selectOrderData);

  // This variable sums the total cost of the items in the cart
  const { totalPrice } = useCalculateTotalPrice();

  // Set the title of the current page
  useTitle("Корзина");

  if (order.length <= 0) {
    return <h2 style={{ textAlign: "center" }}>Корзина пустая</h2>;
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
});

export default FullOrder;
