import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Page from "../UI/Page";
import Input from "../UI/Input";
import classes from "./form.module.scss";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { resetPwd } from "../../api/auth-api";

const PwdReset = () => {
  const location = useLocation();
  const history = useHistory();
  const queryParams = new URLSearchParams(location.search);
  const token = queryParams.get("token");
  const id = queryParams.get("id");
  const [resetErr, setResetErr] = useState(null);
  const [resetSuccess, setResetSuccess] = useState(false);
  const email = localStorage.getItem("resetEmail");

  useEffect(() => {
    if (resetSuccess) {
      const goBack = setTimeout(() => {
        localStorage.removeItem("resetEmail");
        history.push("/login");
      }, 5000);
      return () => clearTimeout(goBack);
    }
  }, [resetSuccess, history]);

  return (
    <Page className={classes.page}>
      <Formik
        initialValues={{
          newPwd: "",
          newPwd2: "",
        }}
        validationSchema={Yup.object({
          newPwd: Yup.string()
            .min(6, "👉 Password must be longer than 5")
            .required("👉 Please enter your Email address"),
          newPwd2: Yup.string()
            .oneOf([Yup.ref("newPwd"), null], "👉 Passwords must match")
            .required("👉 Please enter your Email address"),
        })}
        onSubmit={async (value) => {
          try {
            const data = {
              token: token,
              id: id,
              password: value.newPwd,
            };
            await resetPwd(data);
            setResetSuccess(true);
          } catch ({ response }) {
            setResetErr(response.data);
          }
        }}
      >
        <Form className={classes.card}>
          <h1>Reset password</h1>
          <h3>👉 {email}</h3>
          <Input id="newPwd" text="Password" type="password" />
          <Input id="newPwd2" text="Confirm Password" type="password" />
          {resetErr && <p className={classes["reset-pwd__err"]}>{resetErr}</p>}
          {resetSuccess ? (
            <p className={classes["reset-pwd__msg"]}>
              Password reset successful! Jump back to login page now
            </p>
          ) : (
            <button type="submit">Reset Password</button>
          )}
        </Form>
      </Formik>
    </Page>
  );
};

export default PwdReset;
