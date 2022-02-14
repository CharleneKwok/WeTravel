import React from "react";
import classes from "./Button.module.scss";
import line from "../../assets/Line.png";

const Button = (props) => {
  return (
    <button
      className={`${classes.btn} ${props.className}`}
      onClick={props.onClick}
    >
      {props.text}
      <img src={line} alt="line under text" />
    </button>
  );
};

export default Button;
