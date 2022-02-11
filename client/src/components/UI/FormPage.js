import React from "react";
import Nav from "../header/Nav";
import classes from "./FormPage.module.scss";

const FormPage = (props) => {
  return (
    <>
      <Nav />
      <div className={classes.container}>{props.children}</div>
    </>
  );
};

export default FormPage;
