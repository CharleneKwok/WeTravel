import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Nav from "../header/Nav";
import Setting from "../setting/Setting";
import Backdrop from "./Backdrop";
import classes from "./Page.module.scss";

const Page = (props) => {
  const isOpenSettings = useSelector((state) => state.settings.openSettings);

  return (
    <>
      {isOpenSettings && <Setting />}
      <Nav />
      <div className={`${classes.container} ${props.className}`}>
        {props.children}
      </div>
    </>
  );
};

export default Page;
