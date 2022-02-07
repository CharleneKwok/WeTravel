import React, { useState } from "react";
import Button from "../UI/Button";
import LinkButton from "../UI/LinkButton";
import classes from "./Nav.module.scss";
import SideNav from "./SideNav";
import MenuIcon from "../../assets/MenuIcon";

const Nav = () => {
  const [openSideNav, setOpenSideNav] = useState(false);
  const closeSideNavHandler = () => {
    setOpenSideNav(false);
  };

  return (
    <div>
      <header>
        <h1>WeTravel</h1>
        <nav>
          <LinkButton to="/" text="MAIN" />
          <LinkButton to="/explore" text="EXPLORE" />
          <LinkButton to="/profile" text="PROFILE" />
        </nav>
        <Button text="LOGIN" className={classes.login} />
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
