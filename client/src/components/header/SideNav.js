import React from "react";
import classes from "./SideNav.module.scss";
import LinkButton from "../UI/LinkButton";
import Backdrop from "./Backdrop";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar.js";
import { userLogout } from "../../store/auth-actions";

const SideNav = (props) => {
  const user = useSelector((state) => state.auth);
  const info = user.user;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(userLogout(info.id));
    navigate("/");
  };

  return (
    <div className={props.className}>
      <div
        className={`${classes["side-nav"]} ${props.onOpen ? classes.open : ""}`}
      >
        {!user.isLogin ? (
          <button
            className={classes["login-btn"]}
            onClick={() => {
              navigate("/login");
            }}
          >
            LOGIN
          </button>
        ) : (
          <div className={classes.top}>
            <Avatar className={classes.avatar} />
            <h4>Hi! {info.username}</h4>
          </div>
        )}
        <LinkButton to="/" text="MAIN" />
        <LinkButton to="/explore" text="EXPLORE" />
        <LinkButton to="/profile" text="PROFILE" />
        <LinkButton to="/settings" text="SETTING" />
        {user.isLogin && <button onClick={logoutHandler}>LOGOUT</button>}
      </div>
      {props.onOpen && <Backdrop onClick={props.onClose} />}
    </div>
  );
};

export default SideNav;
