import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { settingActions } from "../../store/setting-slice";
import Nav from "../header/Nav";
import Backdrop from "../UI/Backdrop";
import classes from "./Setting.module.scss";

const Setting = () => {
  const isOpenSettings = useSelector((state) => state.settings.openSettings);
  const dispatch = useDispatch();

  return (
    <>
      <Backdrop
        onClick={() => dispatch(settingActions.setOpenSettings())}
        isNav={false}
      />
      <div className={classes.container}></div>
    </>
  );
};

export default Setting;
