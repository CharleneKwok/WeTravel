import React, { useEffect } from "react";
import Nav from "../header/Nav";
import { Formik, Form, useFormikContext } from "formik";
import * as Yup from "yup";
import classes from "./form.module.scss";
import { useHistory, Prompt } from "react-router-dom";
import Input from "../UI/Input";
import { useDispatch, useSelector } from "react-redux";
import { userSignup } from "../../store/auth-actions";

const Signup = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const isLogin = useSelector((state) => state.auth.isLogin);

  useEffect(() => {
    if (isLogin) {
      history.push("/");
    }
  }, [isLogin, history]);

  const PromptIfDirty = () => {
    const formik = useFormikContext();
    return (
      <Prompt
        when={formik.dirty}
        message="Are you sure you want to leave? You have with unsaved changes."
      />
    );
  };

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
          onSubmit={(values, { setFieldError }) => {
            dispatch(userSignup(values, setFieldError));
          }}
        >
          <Form className={classes.card}>
            <h1>Signup</h1>
            <PromptIfDirty />
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
