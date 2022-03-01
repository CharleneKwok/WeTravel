import React from "react";
import { NavLink } from "react-router-dom";
import classes from "./LinkButton.module.scss";

const LinkButton = (props) => {
  const navClasses = (isActive) => {
    if (isActive) {
      if (props.darkMode) {
        const allClasses = `${classes[`link-active`]} ${classes["dark-mode"]}`;
        return allClasses;
      }
      return classes[`link-active`];
    } else {
      if (props.darkMode) {
        const allClasses = `${classes.link} ${classes["dark-mode"]}`;
        return allClasses;
      }
      return classes.link;
    }
  };

  return (
    <NavLink
      to={props.to}
      className={navClasses}
      title={props.text}
      onClick={props.onClick}
    >
      <span />
      {props.text}
    </NavLink>
  );
};

export default LinkButton;
