import React from "react";
import "./MenuIcon.css";

const MenuIcon = (props) => {
  return (
    <svg
      viewBox="0 0 100 80"
      width="50"
      height="50"
      className={`${props.className} ${
        props.isDarkMode ? "dark-menu-icon" : `menu-icon`
      }`}
      onClick={props.onClick}
    >
      <rect width="100" height="10"></rect>
      <rect y="30" width="100" height="10"></rect>
      <rect y="60" width="100" height="10"></rect>
    </svg>
  );
};

export default MenuIcon;
