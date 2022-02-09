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
      localStorage.setItem("token", state.user.token);
    },
    logout(state) {
      state.isLogin = false;
      state.user = [];
      localStorage.removeItem("token");
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
