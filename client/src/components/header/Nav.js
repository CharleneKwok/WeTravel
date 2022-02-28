import React, { useState } from "react";
import LinkButton from "../UI/LinkButton";
import classes from "./Nav.module.scss";
import SideNav from "./SideNav";
import MenuIcon from "../../assets/MenuIcon";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "./Avatar.js";
import Window from "./Window";

const Nav = (props) => {
  const history = useHistory();
  const user = useSelector((state) => state.auth);
  const [openSideNav, setOpenSideNav] = useState(false);
  const [openWindow, setOpenWindow] = useState(false);

  const closeSideNavHandler = () => {
    setOpenSideNav(false);
  };

  return (
    <div>
      <header
        className={`${classes.header} ${
          props.darkMode ? classes["dark-mode"] : ""
        }`}
      >
        <h1 onClick={() => history.push("/")}>WeTravel</h1>
        <nav>
          <LinkButton to="/home" text="HOME" darkMode={props.darkMode} />
          <LinkButton to="/explore" text="EXPLORE" darkMode={props.darkMode} />
          <LinkButton to="/space" text="SPACE" darkMode={props.darkMode} />
        </nav>
        {user.isLogin ? (
          <div className={classes.user}>
            <Avatar
              className={classes.avatar}
              onClick={(e) => {
                setOpenWindow((prev) => !prev);
              }}
            />
            {openWindow && (
              <Window
                className={classes.window}
                onClose={() => setOpenWindow(false)}
              />
            )}
          </div>
        ) : (
          <button
            className={classes.login}
            onClick={() => history.push("/login")}
          >
            LOGIN
          </button>
        )}
        <MenuIcon
          onClick={() => setOpenSideNav(true)}
          className={classes["show-side-nav"]}
        />
      </header>
      <SideNav
        className={classes["show-side-nav"]}
        onClose={closeSideNavHandler}
        onOpen={openSideNav}
      />
    </div>
  );
};

export default Nav;
