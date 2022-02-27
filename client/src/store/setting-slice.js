import { createSlice } from "@reduxjs/toolkit";

const settingSlice = createSlice({
  name: "Settings",
  initialState: {
    openSettings: false,
  },
  reducers: {
    setOpenSettings(state) {
      state.openSettings = !state.openSettings;
    },
  },
});

export const settingActions = settingSlice.actions;
export default settingSlice.reducer;
