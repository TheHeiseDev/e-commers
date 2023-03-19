import { FurnitureType } from "./../furnitureSlice/furnitueTypes";
import { InitialStateFavorite } from "./favoriteType";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";

// //Get auth data from localStorage
// const authData = JSON.parse(localStorage.getItem("authData") || "{}");

const initialState: InitialStateFavorite = {
  items: [],
};

export const favoriteSlice = createSlice({
  name: "favorite",
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<FurnitureType>) {
      const findInFavorites = state.items?.some(
        (item) => item.productCode === action.payload.productCode
      );
      if (findInFavorites) {
        state.items = state.items?.filter(
          (item) => item.productCode !== action.payload.productCode
        );
      } else {
        state.items.push(action.payload);
      }
    },

    clearFavorites(state) {
      state.items = [];
    },
  },
});
export const selectFavorite = (state: RootState) => state.favorite.items;
export const { addFavorite, clearFavorites } = favoriteSlice.actions;
export default favoriteSlice.reducer;
