import { authActions } from "./auth-slice";
import {
  sendSignUp,
  sendLogout,
  sendGetUser,
  sendGoogleLogin,
  sendResetPwdEmail,
} from "../api/auth-api";
import { pwdActions } from "./pwd-slice";
import decode from "jwt-decode";

export const userLogout = (email) => async (dispatch) => {
  try {
    await sendLogout({ email });
    if (localStorage.getItem("profile")) {
      localStorage.removeItem("profile");
    }
    dispatch(authActions.logout());
  } catch (err) {
    console.log(err);
  }
};

export const userSignup = (user, setFieldError) => async (dispatch) => {
  try {
    // username, email, password, avatar
    const resp = await sendSignUp({
      username: user.signupUsername,
      email: user.signupEmail,
      password: user.signUpPwd,
      avatar: "https://cdn-icons-png.flaticon.com/512/149/149071.png",
    });
    dispatch(authActions.login({ user: resp.data }));
  } catch ({ response }) {
    if (response.status === 409) {
      setFieldError("signupEmail", response.data);
    } else if (response.status === 403) {
      setFieldError("signupUsername", response.data);
    } else {
      console.log("signup error ", response);
    }
  }
};

export const userGoogleLogin = (sendData) => async (dispatch) => {
  try {
    const resp = await sendGoogleLogin(sendData);
    dispatch(authActions.login({ user: resp.data }));
  } catch ({ response }) {
    alert(response.data);
  }
};

// send password reset email
export const userResetPwdEmail = (value, setFieldError) => async (dispatch) => {
  try {
    dispatch(pwdActions.emailStatus());
    const resp = await sendResetPwdEmail({ email: value.resetPwdEmail });
    if (resp.status === 200) {
      dispatch(pwdActions.emailStatus());
      localStorage.setItem("resetEmail", value.resetPwdEmail);
    }
  } catch ({ response }) {
    if (response.status === 500) {
      setFieldError("resetPwdEmail", "System error");
    } else {
      setFieldError("resetPwdEmail", response.data);
    }
  }
};

// each user action would call this to check if token is expired
export const checkLogin = () => async (dispatch) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (user) {
    const decodedToken = decode(user.token);
    if (decodedToken.exp * 1000 < new Date().getTime()) {
      dispatch(authActions.changeIsLogin());
      localStorage.removeItem("profile");
      userLogout(decodedToken.email);
      console.log("token invalid");
    } else {
      console.log("token valid");
      dispatch(authActions.login({ user: user }));
    }
  }
};
