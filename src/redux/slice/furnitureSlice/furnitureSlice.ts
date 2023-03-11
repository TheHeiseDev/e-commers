import { createSlice } from "@reduxjs/toolkit";

import { RootState } from "../../store";
import { FurnitureSliceStateType } from "./furnitueTypes";
import { fetchFurnitures } from "./furnitureThunk";

const initialState: FurnitureSliceStateType = {
  items: [],
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
      });
  },
});
// export const {} = furnitureSlice.actions;
export const selectFurnitureData = (state: RootState) => state.furniture;
export default furnitureSlice.reducer;
