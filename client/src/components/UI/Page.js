import React from "react";
import Nav from "../header/Nav";
import classes from "./Page.module.scss";

const FormPage = (props) => {
  return (
    <>
      <Nav />
      <div className={`${classes.container} ${props.className}`}>
        {props.children}
      </div>
    </>
  );
};

export default FormPage;
