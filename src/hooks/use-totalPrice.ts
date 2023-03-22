import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { selectOrderData } from "store/slice/orderSlice/orderSlice";

export function useCalculateTotalPrice() {
  const [totalPrice, setTotalPrice] = useState(0);

  const orders = useSelector(selectOrderData);

  useEffect(() => {
    const totalPrice = orders
      .reduce((sum, item) => sum + parseFloat(item.price) * item.count!, 0)
      .toFixed(2);
    setTotalPrice(Number(totalPrice));
  }, [orders]);

  return { totalPrice };
}
