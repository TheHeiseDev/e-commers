import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { InitialStateHistory } from "./historyType";

const initialState: InitialStateHistory = {
  pathname: null,
};

export const historySlice = createSlice({
  name: "history",
  initialState,
  reducers: {
    setHistory(state, action) {
      state.pathname = action.payload;
    },
  },
});

export const selectHistory = (state: RootState) => state.history.pathname;
export const { setHistory } = historySlice.actions;
export default historySlice.reducer;
