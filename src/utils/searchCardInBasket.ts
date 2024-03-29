import { FurnitureType } from "store/slice/furnitureSlice/furnitueTypes";

export function searchCardInBasket(orders: FurnitureType[], item: FurnitureType) {
  if (orders && item) {
    const foundItemFromCart = orders.some((order) => order.id === item.id);
    return foundItemFromCart;
  }
}
