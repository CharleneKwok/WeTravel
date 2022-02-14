import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Page from "../UI/Page";
import Input from "../UI/Input";
import classes from "./form.module.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userResetPwdEmail } from "../../store/auth-actions";
import { useLocation } from "react-router-dom";
import PwdReset from "./PwdReset";

const ForgotPwd = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const isSending = useSelector((state) => state.pwdReset.isSending);
  const message = useSelector((state) => state.pwdReset.message);
  const [checkIsSending, setCheckIsSending] = useState(false);
  const [submit, setSubmit] = useState(false);
  const queryParams = location.search;

  useEffect(() => {
    if (submit) {
      setCheckIsSending(isSending);
    }
  }, [submit, isSending]);

  return (
    <Page className={classes.page}>
      {!queryParams ? (
        <Formik
          initialValues={{
            resetPwdEmail: "",
          }}
          validationSchema={Yup.object({
            resetPwdEmail: Yup.string()
              .email("👉 Invalid email address")
              .required("👉 Please enter your Email address"),
          })}
          onSubmit={(value, { setFieldError }) => {
            setSubmit(true);
            dispatch(userResetPwdEmail(value, setFieldError));
          }}
        >
          <Form className={classes.card}>
            <h1>Forgot password</h1>
            <Input id="resetPwdEmail" text="Email" type="email" />
            {submit && !checkIsSending && (
              <p className={classes["reset-pwd__msg"]}>{message}</p>
            )}
            <button type="submit" disabled={checkIsSending}>
              {checkIsSending ? message : "Reset Password"}
            </button>
          </Form>
        </Formik>
      ) : (
        <PwdReset />
      )}
    </Page>
  );
};

export default ForgotPwd;
