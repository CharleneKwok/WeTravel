import { authActions } from "./auth-slice";
import { uiActions } from "./ui-slice";
import { sendLogin, sendSignUp, sendLogout } from "../components/api/auth-api";

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

export const userLogout = (email) => async (dispatch) => {
  try {
    await sendLogout({ email });
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
