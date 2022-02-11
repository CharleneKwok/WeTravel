import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import errReducer from "./err-slice";
import pwdReducer from "./pwd-slice";

const store = configureStore({
  reducer: { auth: authReducer, errMsg: errReducer, pwdReset: pwdReducer },
});

export default store;
