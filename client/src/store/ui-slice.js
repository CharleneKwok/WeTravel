import { createSlice } from "@reduxjs/toolkit";

const uiSlice = createSlice({
  name: "uiError",
  initialState: {
    status: "",
    message: "",
  },
  reducers: {
    showNotification(state, action) {
      state.status = action.status;
      state.message = action.message;
    },
  },
});

export const uiActions = uiSlice.actions;
export default uiSlice.reducer;
