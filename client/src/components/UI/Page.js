import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Nav from "../header/Nav";
import Setting from "../setting/Setting";
import classes from "./Page.module.scss";

const Page = (props) => {
  const isOpenSettings = useSelector((state) => state.settings.openSettings);

  return (
    <>
      {isOpenSettings && <Setting />}
      {props?.isDarkMode ? <Nav darkMode={true} /> : <Nav />}
      <div className={`${classes.container} ${props.className}`}>
        {props.children}
      </div>
    </>
  );
};

export default Page;
