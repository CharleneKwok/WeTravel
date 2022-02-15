import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth-slice";
import errReducer from "./err-slice";
import pwdReducer from "./pwd-slice";
import listReducer from "./list-slice";

const store = configureStore({
  reducer: {
    auth: authReducer,
    errMsg: errReducer,
    pwdReset: pwdReducer,
    mainList: listReducer,
  },
});

export default store;
