import { FurnitureType } from "../redux/slice/furnitureSlice/furnitueTypes";

export function searchCardInBasket(orders: FurnitureType[], item: FurnitureType) {
  const foundItemFromCart = orders.some((order) => order.id === item.id);

  return foundItemFromCart;
}
