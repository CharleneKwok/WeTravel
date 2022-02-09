import React from "react";
import { useSelector } from "react-redux";
import classes from "./Avatar.module.scss";

const Avatar = (props) => {
  const avatar = useSelector((state) => state.auth.user.avatar);
  return (
    <div
      className={`${props.className} ${classes.container}`}
      onClick={props.onClick}
    >
      <img src={avatar} alt="avatar" width="100%" height="100%" />
    </div>
  );
};

export default Avatar;
