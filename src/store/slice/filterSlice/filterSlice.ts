import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { fetchAllFurnitures } from "./filterThunk";
import { FilterSliceStateType } from "./filterTypes";
import { Sort } from "./filterTypes";

const initialState: FilterSliceStateType = {
  items: {
    data: null,
    status: "loading",
  },
  category: "",
  manufacturer: "",
  installment: false,
  filter: "",
  currentPage: 1,
  sort: {
    name: "Популярности",
    sortBy: "",
  },
};

export const filterSlice = createSlice({
  name: "filter",
  initialState,

  reducers: {
    setInstallment(state, action: PayloadAction<any>) {
      state.installment = action.payload;
    },
    setSort(state, action: PayloadAction<Sort>) {
      state.sort = action.payload;
    },
    setManufacturer(state, action: PayloadAction<string>) {
      state.manufacturer = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
    setCategory(state, action: PayloadAction<string>) {
      state.category = action.payload;
    },
    setFilters(state, action) {
      if (Object.keys(action.payload).length) {
        state.sort = action.payload.sort;
        state.currentPage = action.payload.currentPage;
        state.filter = action.payload.filter;
        state.manufacturer = action.payload.manufacturer;
        state.installment = action.payload.installment;
        state.category = action.payload.category;
      } else {
        state.currentPage = 1;
        state.filter = "";
        state.manufacturer = "";
        state.installment = false;
        state.category = "";
        state.sort = {
          name: "Популярности",
          sortBy: "",
        };
      }
    },
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
export const {
  setCurrentPage,
  setFilters,
  setCategory,
  setSort,
  setInstallment,
  setManufacturer,
} = filterSlice.actions;
export const selectAllFurniture = (state: RootState) => state.filter.items;
export const selectAllFurnitureData = (state: RootState) => state.filter;
export default filterSlice.reducer;
