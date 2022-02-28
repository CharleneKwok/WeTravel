import React, { useRef, useState } from "react";
import classes from "./ActiveButton.module.scss";
import line2 from "../../assets/Line2.png";
import { useDispatch, useSelector } from "react-redux";
import { settingActions } from "../../store/setting-slice";

const ActiveButton = (props) => {
  const dispatch = useDispatch();
  const currLocation = useSelector((state) => state.settings.currLocation);
  const clickHandler = () => {
    dispatch(settingActions.setCurrLocarion({ currLocation: props.text }));
  };

  return (
    <div className={classes["btn-container"]}>
      <button
        className={`${classes["btn"]} ${
          currLocation === props.text ? classes["btn__hover"] : ""
        }`}
        onClick={clickHandler}
      >
        {props.text}
      </button>
      <img src={line2} alt="line" />
    </div>
  );
};

export default ActiveButton;
