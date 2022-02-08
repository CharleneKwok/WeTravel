import React from "react";
import Nav from "../header/Nav";
import Input from "../UI/Input";
import classes from "./form.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import google from "../../assets/Google.svg";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "react-google-login";

const Login = () => {
  const navigate = useNavigate();

  const googleSuccess = async (res) => {
    console.log(res);
  };

  const googleFailure = async (err) => {
    console.log(err);
    console.log("faliure");
  };

  return (
    <>
      <Nav />
      <div className={classes.container}>
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
              .min(1, "👉 Password cannot be empty")
              .required("👉 Please enter your password"),
          })}
          onSubmit={(values) => {
            console.log(values);
            navigate("/profile");
          }}
        >
          <Form className={classes.card}>
            <h1>Login</h1>
            <Input id="loginEmail" text="Email" type="email" />
            <Input id="loginPwd" text="Password" type="password" />
            <a href="/">Forgotten password?</a>
            <button>LOGIN</button>
            <button onClick={() => navigate("/signup")}>SIGNUP</button>
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
              clientId="27800067760-ch205cuvhdmtg7ko4sb397dugedr660t.apps.googleusercontent.com"
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
