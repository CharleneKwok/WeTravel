import React from "react";
import Input from "../UI/Input";
import classes from "./form.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import google from "../../assets/Google.svg";
import { Link, useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import Page from "../UI/Page";
import { authActions } from "../../store/auth-slice";
import { sendLogin } from "../../api/auth-api";
import { GoogleLogin, useGoogleLogin } from "@react-oauth/google";
import { userGoogleLogin } from "../../store/auth-actions";
import axios from "axios";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    const resp = await axios.get(
      `https://oauth2.googleapis.com/tokeninfo?id_token=${res.credential}`
    );
    const info = resp.data;
    let data = {
      username: info.given_name,
      email: info.email,
      token: res.credential,
      avatar: info.picture,
    };
    dispatch(userGoogleLogin(data));
    history.push("/");
  };

  const googleFailure = async (err) => {
    console.log(err);
  };

  const googleLogin = useGoogleLogin({
    onSuccess: (res) => {
      console.log("auth.js-googlesuccess-res", res);
      fetch(
        `https://oauth2.googleapis.com/tokeninfo?id_token=${res.credential}`
      )
        .then((res) => res.json())
        .then((response) => {
          console.log("user Info=", response);
        })
        .catch((error) => console.log(error));
    },
    onError: googleFailure,
  });

  // useGoogleOneTapLogin({
  //   onSuccess: googleSuccess,
  //   onError: googleFailure,
  // });

  return (
    <Page className={classes.page}>
      <Formik
        initialValues={{
          loginEmail: "",
          loginPwd: "",
        }}
        validationSchema={Yup.object({
          loginEmail: Yup.string()
            .email("👉 Invalid email address")
            .required("👉 Please enter your Email address"),
          loginPwd: Yup.string()
            .min(6, "👉 Password must be longer than 5")
            .required("👉 Please enter your password"),
        })}
        onSubmit={async (values, { setFieldError }) => {
          try {
            const sendData = {
              email: values.loginEmail,
              password: values.loginPwd,
            };
            const resp = await sendLogin(sendData);
            if (resp.status === 200) {
              history.push("/");
              dispatch(authActions.login({ user: resp.data }));
            }
          } catch ({ response }) {
            if (response.status === 400) {
              setFieldError("loginPwd", response.data);
            } else {
              setFieldError("loginEmail", response.data);
            }
          }
        }}
      >
        <Form className={classes.card}>
          <h1>Login</h1>
          <Input id="loginEmail" text="Email" type="email" />
          <Input id="loginPwd" text="Password" type="password" />
          <Link to="/pwd-reset" className={classes["reset-pwd__link"]}>
            Forgotten password?
          </Link>
          <button type="submit">LOGIN</button>
          <button onClick={() => history.push("/signup")}>SIGNUP</button>
          <button className={classes.google} type="button">
            <img src={google} alt="google login button" />
            <p>Sign in with Google</p>
            <div style={{ position: "absolute", opacity: 0 }}>
              <GoogleLogin
                onSuccess={googleSuccess}
                onFailure={googleFailure}
              />
            </div>
          </button>
        </Form>
      </Formik>
    </Page>
  );
};

export default Login;
