import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { FurnitureSliceStateType } from "./furnitueTypes";
import { fetchFurnitureById, fetchFurnitures } from "./furnitureThunk";

const initialState: FurnitureSliceStateType = {
  items: {
    data: null,
    status: "loading",
  },
  item: {
    data: null,
    status: "loading",
  },
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFurnitures.pending, (state) => {
        state.items.status = "loading";
        state.items.data = null;
      })
      .addCase(fetchFurnitures.fulfilled, (state, action) => {
        state.items.status = "success";
        state.items.data = action.payload;
      })
      .addCase(fetchFurnitures.rejected, (state) => {
        state.items.status = "error";
        state.items.data = null;
      })
      .addCase(fetchFurnitureById.pending, (state) => {
        state.item.status = "loading";
        state.item.data = null;
      })
      .addCase(fetchFurnitureById.fulfilled, (state, action) => {
        state.item.status = "success";
        state.item.data = action.payload;
      })
      .addCase(fetchFurnitureById.rejected, (state) => {
        state.item.status = "error";
        state.item.data = null;
      });
  },
});
// export const {} = furnitureSlice.actions;
export const selectFurnitureAllData = (state: RootState) => state.furniture.items;
export const selectFurnitureByIdData = (state: RootState) => state.furniture.item;
export default furnitureSlice.reducer;
