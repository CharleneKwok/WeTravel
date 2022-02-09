import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import errReducer from "./err-slice";

const store = configureStore({
  reducer: { auth: authReducer, errMsg: errReducer },
});

export default store;
