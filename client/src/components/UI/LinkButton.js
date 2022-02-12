import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./LinkButton.module.scss";

const LinkButton = (props) => {
  return (
    <NavLink
      to={props.to}
      className={(isActive) =>
        isActive ? classes[`link-active`] : classes.link
      }
    >
      <span />
      {props.text}
    </NavLink>
  );
};

export default LinkButton;
