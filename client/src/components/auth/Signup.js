import React from "react";
import Nav from "../header/Nav";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import classes from "./form.module.scss";
import { useNavigate } from "react-router-dom";
import Input from "../UI/Input";

const Signup = () => {
  const navigate = useNavigate();
  return (
    <>
      <Nav />
      <div className={classes.container}>
        <Formik
          initialValues={{
            signupUsername: "",
            signupEmail: "",
            signUpPwd: "",
            signUpPwd2: "",
          }}
          validationSchema={Yup.object({
            signupUsername: Yup.string()
              .min(1, "👉 Username cannot be empty")
              .required("👉 Please enter your username"),
            signupEmail: Yup.string()
              .email("👉 Invalid email address")
              .required("👉 Please enter your Email address"),
            signUpPwd: Yup.string()
              .min(6, "👉 Password must be longer than 6")
              .required("👉 Please enter your password"),
            signUpPwd2: Yup.string()
              .oneOf([Yup.ref("signUpPwd"), null], "👉 Passwords must match")
              .required("👉 Please enter your password again"),
          })}
          onSubmit={(values) => {
            console.log(values);
            navigate("/profile");
          }}
        >
          <Form className={classes.card}>
            <h1>Signup</h1>
            <Input id="signupUsername" text="Username" type="text" />
            <Input id="signupEmail" text="Email" type="email" />
            <Input id="signUpPwd" text="Password" type="password" />
            <Input id="signUpPwd2" text="Confirm Password" type="password" />
            <button>SIGNUP</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default Signup;
