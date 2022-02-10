import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
  name: "auth",
  initialState: {
    isLogin: false,
    user: {},
  },
  reducers: {
    login(state, action) {
      state.isLogin = true;
      state.user = action.payload.user;
      localStorage.setItem("profile", JSON.stringify(action.payload.user));
    },
    logout(state) {
      state.isLogin = false;
      state.user = {};
      localStorage.removeItem("profile");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
