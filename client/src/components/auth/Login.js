import React from "react";
import Nav from "../header/Nav";
import Input from "../UI/Input";
import classes from "./Login.module.scss";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import google from "../../assets/Google.svg";

const Login = () => {
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
              .min(1, "👉 password cannot be empty")
              .required("👉 Please enter your password"),
          })}
          onSubmit={(values) => {
            console.log(values);
          }}
        >
          <Form className={classes.card}>
            <h1>Login</h1>
            <Input id="loginEmail" text="Email" type="email" />
            <Input id="loginPwd" text="Password" type="password" />
            <button>LOGIN</button>
            <button>SIGNUP</button>
            <button className={classes.google}>
              <img src={google} alt="google login button" />
              <p>Sign in with Google</p>
            </button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Login;
