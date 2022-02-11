import { createSlice } from "@reduxjs/toolkit";

const pwdSlice = createSlice({
  name: "pwdReset",
  initialState: {
    isSending: false,
    message: "",
  },
  reducers: {
    emailStatus(state) {
      state.isSending = !state.isSending;
      if (state.isSending) {
        state.message = "Sending email...";
      } else {
        state.message =
          "Link sent to your Email. Please check your email or spam.";
      }
    },
  },
});

export const pwdActions = pwdSlice.actions;
export default pwdSlice.reducer;
