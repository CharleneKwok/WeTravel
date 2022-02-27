import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../store/auth-actions";
import { settingActions } from "../../store/setting-slice";
import Setting from "../setting/Setting";
import classes from "./Window.module.scss";

const Window = (props) => {
  const ref = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.username);
  const email = useSelector((state) => state.auth.user.email);
  const isOpenSettings = useSelector((state) => state.settings.openSettings);

  const handleClick = useCallback(
    (e) => {
      if (ref?.current?.contains(e.target)) {
        return;
      }
      props.onClose();
    },
    [props]
  );

  const logoutHandler = () => {
    dispatch(userLogout(email));
    history.push("/");
  };

  useEffect(() => {
    if (isOpenSettings) {
      props.onClose();
    }
  }, [isOpenSettings]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  return (
    <div className={`${props.className} ${classes.container}`} ref={ref}>
      <h4>Hi! {name}</h4>
      <button onClick={() => dispatch(settingActions.setOpenSettings())}>
        ⚙️ Settings
      </button>
      <button onClick={logoutHandler}>👋 Logout</button>
    </div>
  );
};

export default Window;
