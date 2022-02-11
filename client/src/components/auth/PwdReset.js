import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import Nav from "../header/Nav";
import FormPage from "../UI/FormPage";
import Input from "../UI/Input";
import classes from "./form.module.scss";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { userResetPwdEmail } from "../../store/auth-actions";

const PwdReset = () => {
  const dispatch = useDispatch();
  const isSending = useSelector((state) => state.pwdReset.isSending);
  const message = useSelector((state) => state.pwdReset.message);
  const [checkIsSending, setCheckIsSending] = useState(false);
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
    if (submit) {
      setCheckIsSending(isSending);
    }
  }, [submit, isSending]);

  return (
    <FormPage>
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
    </FormPage>
  );
};

export default PwdReset;
