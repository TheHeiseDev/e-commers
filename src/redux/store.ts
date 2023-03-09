import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import furnitureSlice from "./slice/furnitureSlice/furnitureSlice";
import orderSlice from "./slice/orderSlice/orderSlice";

export const store = configureStore({
  reducer: {
    furniture: furnitureSlice,
    order: orderSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
