import { configureStore } from "@reduxjs/toolkit";
import furnitureSlice from "./slice/furnitureSlice";
import orderSlice from "./slice/orderSlice";

export const store = configureStore({
  reducer: {
    furniture: furnitureSlice,
    order: orderSlice,
  },
});
