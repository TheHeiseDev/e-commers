import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import favoriteSlice from "./slice/favoriteSlice/favoriteSlice";
import filterSlice from "./slice/filterSlice/filterSlice";
import furnitureSlice from "./slice/furnitureSlice/furnitureSlice";
import historySlice from "./slice/historySlice /historySlice";
import orderSlice from "./slice/orderSlice/orderSlice";
import userSlice from "./slice/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    furniture: furnitureSlice,
    order: orderSlice,
    user: userSlice,
    favorite: favoriteSlice,
    history: historySlice,
    filter: filterSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
