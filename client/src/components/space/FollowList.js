import React from "react";
import Backdrop from "../UI/Backdrop";
import classes from "./FollowList.module.scss";

const FollowList = (props) => {
  return (
    <>
      {props.text !== "" && <Backdrop isNav={false} onClick={props.onClose} />}
      <div
        className={`${classes.container} ${
          props.text !== "" && classes["show-container"]
        }`}
      >
        <h3>{props.text}</h3>
      </div>
    </>
  );
};

export default FollowList;
