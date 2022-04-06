import React from "react";
import Avatar from "../header/Avatar";
import classes from "./Space.module.scss";

const UserInfo = (props) => {
  return (
    <div className={classes["space-image"]}>
      <div className={classes["user_info"]}>
        <Avatar
          className={classes["user_info--avatar"]}
          src={props.user.avatar}
        />
        <h2>{props.user.username}</h2>
        <div className={classes["user_info--follow"]}>
          <p>Followers: {props.user.followers}</p>
          <p>Following: {props.user.following}</p>
        </div>
        <div className={classes["user_info--bio"]}>
          bio:
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
