import { authActions } from "./auth-slice";
import { errActions } from "./err-slice";
import {
  sendLogin,
  sendSignUp,
  sendLogout,
  sendGetUser,
  sendGoogleLogin,
  sendResetPwdEmail,
  resetPwd,
} from "../api/auth-api";
import { pwdActions } from "./pwd-slice";

export const userLogin = (user, setFieldError) => async (dispatch) => {
  try {
    const sendData = {
      email: user.loginEmail,
      password: user.loginPwd,
    };
    const resp = await sendLogin(sendData);
    dispatch(authActions.login({ user: resp.data }));
  } catch ({ response }) {
    if (response.status === 400) {
      setFieldError("loginPwd", response.data);
    } else {
      setFieldError("loginEmail", response.data);
    }
  }
};

export const userLogout = (email) => async (dispatch) => {
  try {
    await sendLogout({ email });
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
    } else {
      console.log("signup error ", response);
    }
  }
};

export const getUser = (id) => async (dispatch) => {
  try {
    const resp = await sendGetUser(id);
    console.log("🚀 ~ resp", resp);
    dispatch(authActions.login({ user: resp.data }));
  } catch (err) {
    console.log(err);
  }
};

export const userGoogleLogin = (user, token) => async (dispatch) => {
  try {
    const sendData = {
      username: user.givenName,
      email: user.email,
      token: token,
      avatar: user.imageUrl,
    };
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
