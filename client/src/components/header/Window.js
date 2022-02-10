import React, { useCallback, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { userLogout } from "../../store/auth-actions";
import classes from "./Window.module.scss";

const Window = (props) => {
  const ref = useRef();
  const history = useHistory();
  const dispatch = useDispatch();
  const name = useSelector((state) => state.auth.user.username);
  const id = useSelector((state) => state.auth.user.id);

  const handleClick = useCallback(
    (e) => {
      if (ref.current.contains(e.target)) {
        return;
      }
      props.onClose();
    },
    [props]
  );

  const logoutHandler = () => {
    dispatch(userLogout(id));
    history.push("/");
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  return (
    <div className={`${props.className} ${classes.container}`} ref={ref}>
      <h4>Hi! {name}</h4>
      <button onClick={() => history.push("/setting")}>⚙️ Settings</button>
      <button onClick={logoutHandler}>👋 Logout</button>
    </div>
  );
};

export default Window;
