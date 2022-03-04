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
    },
    changeUsername(state, action) {
      state.user.username = action.payload.username;
      localStorage.setItem("profile", JSON.stringify(state.user));
    },
    changeAvatar(state, action) {
      state.user.avatar = action.payload.avatar;
      localStorage.setItem("profile", JSON.stringify(state.user));
    },
    changeBio(state, action) {
      state.user.bio = action.payload.bio;
      localStorage.setItem("profile", JSON.stringify(state.user));
    },
    changeMapAppearance(state, action) {
      state.user.mapAppearance = action.payload.mapAppearance;
      localStorage.setItem("profile", JSON.stringify(state.user));
    },
  },
});

export const authActions = authSlice.actions;
export default authSlice.reducer;
