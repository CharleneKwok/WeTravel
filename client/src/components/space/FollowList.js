import React, { useState } from "react";
import { Link } from "react-router-dom";
import Avatar from "../header/Avatar";
import Backdrop from "../UI/Backdrop";
import classes from "./FollowList.module.scss";

const FollowList = (props) => {
  const followList =
    props.text === "Followers"
      ? props.followers
      : props.text === "Following"
      ? props.following
      : [];

  return (
    <>
      {props.text !== "" && <Backdrop isNav={false} onClick={props.onClose} />}
      <div
        className={`${classes.container} ${
          props.text !== "" && classes["show-container"]
        }`}
      >
        <h1>{props.text}</h1>
        <div className={classes["list-wrapper"]}>
          {followList.map((user, i) => (
            <div key={`follow_${i}`} className={classes.user}>
              <Avatar src={user.avatar} />
              <Link
                to={`/user-space?id=${user.userId}`}
                target="_blank"
                className={classes["user__name"]}
              >
                {user.username}
              </Link>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default FollowList;
