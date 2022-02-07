import React from "react";
import ReactDOM from "react-dom";
import classes from "./Backdrop.module.scss";

const Back = (props) => {
  return <div className={classes.backdrop} onClick={props.onClick} />;
};

const Backdrop = (props) => {
  return (
    <>
      {ReactDOM.createPortal(
        <Back onClick={props.onClick} />,
        document.getElementById("root-backdrop")
      )}
    </>
  );
};

export default Backdrop;
