import { createSlice } from "@reduxjs/toolkit";

const errSlice = createSlice({
  name: "errMsg",
  initialState: {
    status: 0,
    message: "",
  },
  reducers: {
    showNotification(state, action) {
      state.status = action.payload.status;
      state.message = action.payload.message;
      console.log(state.message);
    },
  },
});

export const errActions = errSlice.actions;
export default errSlice.reducer;
