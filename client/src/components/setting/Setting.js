import React, { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { settingActions } from "../../store/setting-slice";
import ActiveButton from "../UI/ActiveButton";
import Backdrop from "../UI/Backdrop";
import Appearance from "./Appearance";
import Profile from "./Profile";
import classes from "./Setting.module.scss";

const Setting = () => {
  const isLogin = useSelector((state) => state.auth.isLogin);
  const currLocation = useSelector((state) => state.settings.currLocation);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    if (!isLogin) {
      const interval = setTimeout(() => {
        dispatch(settingActions.setOpenSettings());
        history.push("/login");
      }, 500);
      return () => clearTimeout(interval);
    }
  }, [isLogin]);

  return (
    <>
      <Backdrop
        onClick={() => dispatch(settingActions.setOpenSettings())}
        isNav={false}
      />
      <div className={classes.container}>
        <nav>
          <ActiveButton text="PROFILE" />
          <ActiveButton text="APPEARANCE" />
          <ActiveButton text="FEEDBACK" />
        </nav>
        <section>
          {currLocation === "PROFILE" && <Profile />}
          {currLocation === "APPEARANCE" && <Appearance />}
        </section>
      </div>
    </>
  );
};

export default Setting;
