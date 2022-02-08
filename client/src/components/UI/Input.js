import React from "react";
import classes from "./Input.module.scss";
import { useField } from "formik";

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
      {meta.touched && meta.error ? (
        <p className={classes.error}>{meta.error}</p>
      ) : null}
    </div>
  );
};

export default Input;
