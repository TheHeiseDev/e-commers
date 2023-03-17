import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store";
import { InitialStateUser } from "./userType";

//Get auth data from localStorage
const authData = JSON.parse(localStorage.getItem("authData") || "{}");

const initialState: InitialStateUser = {
  email: authData.email || null,
  token: authData.token || null,
  id: authData.id || null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<InitialStateUser>) {
      state.email = action.payload.email;
      state.token = action.payload.token;
      state.id = action.payload.id;
    },
    removeUser(state) {
      state.email = null;
      state.token = null;
      state.id = null;
    },
  },
});
export const selectUser = (state: RootState) => state.user;
export const { setUser, removeUser } = userSlice.actions;
export default userSlice.reducer;
