import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import Nav from "../header/Nav";
import Setting from "../setting/Setting";
import Backdrop from "./Backdrop";
import classes from "./Page.module.scss";

const Page = (props) => {
  const isOpenSettings = useSelector((state) => state.settings.openSettings);
  const location = useLocation();
  console.log("🚀 ~ location", location);

  return (
    <>
      {isOpenSettings && <Setting />}
      {location.pathname.includes("space") ? <Nav darkMode={true} /> : <Nav />}
      <div className={`${classes.container} ${props.className}`}>
        {props.children}
      </div>
    </>
  );
};

export default Page;
