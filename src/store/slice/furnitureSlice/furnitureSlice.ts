import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { FurnitureSliceStateType, FurnitureType } from "./furnitueTypes";
import { fetchFurnitureById, fetchFurnitures } from "./furnitureThunk";

const initialState: FurnitureSliceStateType = {
  items: [],
  item: {} as FurnitureType,
  status: "success",
};

export const furnitureSlice = createSlice({
  name: "furniture",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(fetchFurnitures.pending, (state) => {
        state.status = "loading";
        state.items = [];
      })
      .addCase(fetchFurnitures.fulfilled, (state, action) => {
        state.status = "success";
        state.items = action.payload;
      })
      .addCase(fetchFurnitures.rejected, (state) => {
        state.status = "error";
        state.items = [];
      })
      .addCase(fetchFurnitureById.pending, (state) => {
        state.status = "loading";
        state.item = {} as FurnitureType;
      })
      .addCase(fetchFurnitureById.fulfilled, (state, action) => {
        state.status = "success";
        state.item = action.payload;
      })
      .addCase(fetchFurnitureById.rejected, (state) => {
        state.status = "error";
        state.item = {} as FurnitureType;
      });
  },
});
export const {} = furnitureSlice.actions;
export const selectFurnitureData = (state: RootState) => state.furniture;
export default furnitureSlice.reducer;
