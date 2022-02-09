import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";
import {
  sendLogin,
  sendSignUp,
  sendLogout,
  sendGetUser,
} from "../components/api/auth-api";

export const userLogin = (user) => async (dispatch) => {
  try {
    const sendData = {
      email: user.loginEmail,
      password: user.loginPwd,
    };
    const resp = await sendLogin(sendData);
    dispatch(authActions.login({ user: resp.data.user }));
  } catch (err) {
    console.log("login ", err);
  }
};

export const userLogout = (id) => async (dispatch) => {
  try {
    await sendLogout({ id });
    dispatch(authActions.logout());
  } catch (err) {
    console.log("logout ", err);
  }
};

export const userSignup = (user) => async (dispatch) => {
  // try {
  //   const user
  // }
};

// after reload the website, get the user info and login again through token
export const getUser = (id) => async (dispatch) => {
  try {
    const resp = await sendGetUser(id);
    console.log("🚀 ~ resp", resp);
    dispatch(authActions.login({ user: resp.data.user }));
  } catch (err) {
    console.log("get user ", err);
  }
};
