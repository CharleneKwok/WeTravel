import React, { useEffect, useState } from "react";
import Input from "../UI/Input";
import classes from "./form.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import google from "../../assets/Google.svg";
import { Link, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import { userGoogleLogin, userLogin } from "../../store/auth-actions";
import Page from "../UI/Page";
import { authActions } from "../../store/auth-slice";
import { sendLogin } from "../../api/auth-api";

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const googleSuccess = async (res) => {
    history.push("/");
    dispatch(userGoogleLogin(res.profileObj, res.tokenId));
  };

  const googleFailure = async (err) => {
    console.log("faliure");
  };

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
              history.goBack();
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
          <GoogleLogin
            render={(props) => (
              <button
                className={classes.google}
                onClick={props.onClick}
                disabled={props.disabled}
              >
                <img src={google} alt="google login button" />
                <p>Sign in with Google</p>
              </button>
            )}
            clientId={process.env.REACT_APP_OAUTH}
            onSuccess={googleSuccess}
            onFailure={googleFailure}
            cookiePolicy="single_host_origin"
          />
        </Form>
      </Formik>
    </Page>
  );
};

export default Login;
