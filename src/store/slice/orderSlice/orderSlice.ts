import { FurnitureType } from "../furnitureSlice/furnitueTypes";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { OrderSliceStateType } from "./orderType";
import { RootState } from "../../store";

const initialState: OrderSliceStateType = {
  items: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action: PayloadAction<FurnitureType>) {
      const checkOrderItem = state.items.find((order) => order.id === action.payload.id);

      if (checkOrderItem) {
        const newOrderArrar = state.items.filter(
          (order) => order.id !== action.payload.id
        );
        state.items = newOrderArrar;
      } else {
        state.items.push({
          ...action.payload,
          count: 1,
        });
      }
    },

    deleteOrder(state, action) {
      const returnToNewOrders = state.items.filter((el) => el.id !== action.payload);
      state.items = returnToNewOrders;
    },
    plusOrderCount(state, action) {
      const checkOrderItem = state.items.find(
        (order) => order.productCode === action.payload
      );

      if (checkOrderItem) {
        checkOrderItem.count!++;
      }
    },
    minusOrderCount(state, action) {
      const checkOrderItem = state.items.find(
        (order) => order.productCode === action.payload
      );

      if (checkOrderItem) {
        if (checkOrderItem.count! > 1) {
          checkOrderItem.count!--;
        }
      }
    },
  },
});
export const selectOrderData = (state: RootState) => state.order.items;
export const { addOrder, deleteOrder, plusOrderCount, minusOrderCount } =
  orderSlice.actions;
export default orderSlice.reducer;
