import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { apiService } from "../../api/apiService";

const initialState = {
  items: [],
  status: "success",
};

export const fetchFurnitures = createAsyncThunk(
  "furniture/fetchFurnitures",
  async (params) => {
    const { category, postLimit } = params;
    const { data } = await axios.get(`${apiService.getFurniture}${postLimit}${category}`);
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
        // state.status = "loading";
        state.items = action.payload;
      })
      .addCase(fetchFurnitures.rejected, (state, action) => {
        state.status = "error";
        console.log(action);
        state.items = [];
      });
  },
});
// export const {} = furnitureSlice.actions;
export default furnitureSlice.reducer;
