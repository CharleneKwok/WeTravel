import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "Settings",
  initialState: {
    openSettings: false,
    currLocation: "PROFILE",
  },
  reducers: {
    setOpenSettings(state) {
      state.openSettings = !state.openSettings;
      if (!state.openSettings) {
        state.currLocation = "PROFILE";
      }
    },
    setCurrLocarion(state, action) {
      state.currLocation = action.payload.currLocation;
    },
  },
});

export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
