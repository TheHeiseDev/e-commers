import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchAllFurnitures } from "./filterThunk";
import { FilterSliceStateType } from "./filterTypes";

const initialState: FilterSliceStateType = {
  items: {
    data: null,
    status: "loading",
  
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
 
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchAllFurnitures.pending, (state) => {
        state.items.status = "loading";
        state.items.data = null;
      })
      .addCase(fetchAllFurnitures.fulfilled, (state, action) => {
        state.items.status = "success";
        state.items.data = action.payload;
      })
      .addCase(fetchAllFurnitures.rejected, (state) => {
        state.items.status = "error";
        state.items.data = null;
      });
  },
});
// export const { setPage, resetPage } = filterSlice.actions;
export const selectAllFurniture = (state: RootState) => state.filter.items;
export default filterSlice.reducer;
