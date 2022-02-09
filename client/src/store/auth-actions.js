import { authActions } from "./auth-slice";
import { errActions } from "./err-slice";
import {
  sendLogin,
  sendSignUp,
  sendLogout,
  sendGetUser,
} from "../components/api/auth-api";

export const userLogin = (user, setFieldError) => async (dispatch) => {
  try {
    const sendData = {
      email: user.loginEmail,
      password: user.loginPwd,
    };
    const resp = await sendLogin(sendData);
    dispatch(authActions.login({ user: resp.data.user }));
  } catch ({ response }) {
    if (response.status === 400) {
      setFieldError("loginPwd", response.data);
    } else {
      setFieldError("loginEmail", response.data);
    }
  }
};

export const userLogout = (id) => async (dispatch) => {
  try {
    await sendLogout({ id });
    dispatch(authActions.logout());
  } catch ({ response }) {
    dispatch(
      errActions.showNotification({
        status: response.status,
        message: response.data,
      })
    );
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
    dispatch(authActions.login({ user: resp.data.user }));
  } catch ({ response }) {
    if (response.status === 409) {
      setFieldError("signupEmail", response.data);
    } else {
      console.log("signup error ", response);
    }
  }
};

// after reload the website, get the user info and login again through token
export const getUser = (id) => async (dispatch) => {
  try {
    const resp = await sendGetUser(id);
    console.log("🚀 ~ resp", resp);
    dispatch(authActions.login({ user: resp.data.user }));
  } catch ({ response }) {
    dispatch(
      errActions.showNotification({
        status: response.status,
        message: response.data,
      })
    );
  }
};
