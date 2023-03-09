import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../../api/apiService";
import { RootState } from "../../store";
import { FurnitureSliceStateType, ParamsType, FurnitureType } from "./furnitueTypes";

const initialState: FurnitureSliceStateType = {
  items: [],
  status: "success",
};

export const fetchFurnitures = createAsyncThunk(
  "furniture/fetchFurnitures",
  async (params: ParamsType) => {
    const { category, postLimit } = params;
    const { data } = await axios.get<FurnitureType[]>(
      `${apiService.getFurniture}${postLimit}${category}`
    );
    return data;
  }
);

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
