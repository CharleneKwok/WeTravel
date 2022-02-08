import React from "react";
import classes from "./SideNav.module.scss";
import LinkButton from "../UI/LinkButton";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router-dom";

const SideNav = (props) => {
  const navigate = useNavigate();
  return (
    <div className={props.className}>
      <div
        className={`${classes["side-nav"]} ${props.onOpen ? classes.open : ""}`}
      >
        <button
          className={classes["login-btn"]}
          onClick={() => {
            navigate("/login");
          }}
        >
          LOGIN
        </button>
        <LinkButton to="/" text="MAIN" />
        <LinkButton to="/explore" text="EXPLORE" />
        <LinkButton to="/profile" text="PROFILE" />
      </div>
      {props.onOpen && <Backdrop onClick={props.onClose} />}
    </div>
  );
};

export default SideNav;
