import React, { useCallback, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import classes from "./Window.module.scss";

const Window = (props) => {
  const ref = useRef();
  const name = useSelector((state) => state.auth.user.username);

  const handleClick = useCallback(
    (e) => {
      if (ref.current.contains(e.target)) {
        return;
      }
      props.onClose();
    },
    [props]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);

  return (
    <div className={`${props.className} ${classes.container}`} ref={ref}>
      <h3>{name}</h3>
      <button>Setting</button>
      <button>Logout</button>
    </div>
  );
};

export default Window;
