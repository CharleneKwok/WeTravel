import React from "react";
import classes from "./Button.module.scss";
import line from "../../assets/Line.png";
import { NavLink } from "react-router-dom";

const Button = (props) => {
  return (
    <NavLink
      to={props.to}
      className={(isActive) => (isActive ? classes.onFocus : classes.btn)}
    >
      {props.text}
      <img src={line} alt="line under text" />
    </NavLink>
  );
};

export default Button;
