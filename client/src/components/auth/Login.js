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

const Login = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (localStorage.getItem("profile")) {
      console.log("🚀 ~ isLogin", isLogin);
      history.push("/");
    }
  }, [isLogin, history]);

  const googleSuccess = async (res) => {
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
        onSubmit={(values, { setFieldError }) => {
          dispatch(userLogin(values, setFieldError));
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
