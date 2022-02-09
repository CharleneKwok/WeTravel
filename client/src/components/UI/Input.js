import React from "react";
import classes from "./Input.module.scss";
import { ErrorMessage, useField } from "formik";

const Input = (props) => {
  const [field, meta] = useField({ name: props.id, type: props.type });
  const allClass = `${classes["form-input"]} ${
    meta.touched && meta.error ? classes["input-error"] : ""
  }`;
  return (
    <div className={classes.input}>
      <label htmlFor={props.id}>{props.text}</label>
      <input
        className={allClass}
        id={props.id}
        name={props.id}
        type={props.type}
        value={field.value || ""}
        {...field}
      />
      <ErrorMessage name={props.id}>
        {(msg) => <p className={classes.error}>{msg}</p>}
      </ErrorMessage>
    </div>
  );
};

export default Input;
