import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import furnitureSlice from "./slice/furnitureSlice/furnitureSlice";
import orderSlice from "./slice/orderSlice/orderSlice";
import userSlice from "./slice/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    furniture: furnitureSlice,
    order: orderSlice,
    user: userSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
