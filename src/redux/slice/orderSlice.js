import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: [],
};

export const orderSlice = createSlice({
  name: "order",
  initialState,
  reducers: {
    addOrder(state, action) {
      const checkOrderItem = state.items.find((order) => order.id === action.payload.id);

      if (checkOrderItem) {
        const newOrderArrar = state.items.filter(
          (order) => order.id !== action.payload.id
        );
        state.items = newOrderArrar;
      } else {
        state.items.push(action.payload);
      }
    },
    deleteOrder(state, action) {
      const returnToNewOrders = state.items.filter((el) => el.id !== action.payload);
      state.items = returnToNewOrders;
    },
  },
});
export const { addOrder, deleteOrder } = orderSlice.actions;
export default orderSlice.reducer;
