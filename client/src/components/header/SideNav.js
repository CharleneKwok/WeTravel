import React from "react";
import classes from "./SideNav.module.scss";
import LinkButton from "../UI/LinkButton";
import Backdrop from "../UI/Backdrop";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar.js";
import { userLogout } from "../../store/auth-actions";
import { settingActions } from "../../store/setting-slice";

const SideNav = (props) => {
  const user = useSelector((state) => state.auth);
  const info = user.user;
  const history = useHistory();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout(info.email));
    history.push("/");
  };

  return (
    <>
      {props.onOpen && <Backdrop onClick={props.onClose} isNav={true} />}
      <div className={props.className}>
        <div
          className={`${classes["side-nav"]} ${
            props.onOpen ? classes.open : ""
          }`}
        >
          {!user.isLogin ? (
            <button
              className={classes["login-btn"]}
              onClick={() => history.push("/login")}
            >
              LOGIN
            </button>
          ) : (
            <div className={classes.top}>
              <Avatar className={classes.avatar} src={user.user.avatar} />
              <h4>Hi! {info.username}</h4>
            </div>
          )}
          <LinkButton to="/home" text="HOME" />
          <LinkButton to="/explore" text="EXPLORE" />
          <LinkButton to="/space" text="SPACE" />
          {localStorage.getItem("profile") && (
            <>
              <button
                onClick={() => {
                  dispatch(settingActions.setOpenSettings());
                  props.onClose();
                }}
              >
                SETTINGS
              </button>
              <button onClick={logoutHandler}>LOGOUT</button>
            </>
          )}
        </div>
      </div>
    </>
  );
};

export default SideNav;
