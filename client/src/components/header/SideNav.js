import React, { useEffect } from "react";
import Button from "../UI/Button";
import classes from "./SideNav.module.scss";
import LinkButton from "../UI/LinkButton";
import Backdrop from "./Backdrop";

const SideNav = (props) => {
  return (
    <div className={props.className}>
      <div
        className={`${classes["side-nav"]} ${props.onOpen ? classes.open : ""}`}
      >
        <Button text="LOGIN" className={classes["login-btn"]} />
        <LinkButton to="/" text="MAIN" />
        <LinkButton to="/explore" text="EXPLORE" />
        <LinkButton to="/profile" text="PROFILE" />
      </div>
      {props.onOpen && <Backdrop onClick={props.onClose} />}
    </div>
  );
};

export default SideNav;
