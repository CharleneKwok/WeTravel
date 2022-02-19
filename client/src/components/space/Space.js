import React from "react";
import { Redirect } from "react-router-dom";
import Avatar from "../header/Avatar";
import Button from "../UI/Button";
import Page from "../UI/Page";
import classes from "./Space.module.scss";

const Space = () => {
  const user = JSON.parse(localStorage.getItem("profile"));
  if (!user) {
    return <Redirect to="/login" />;
  }

  return (
    <Page className={classes["space-container"]}>
      <div className={classes["space-image"]}>
        <div className={classes["user_info"]}>
          <Avatar className={classes["user_info--avatar"]} />
          <h2>{user.username}</h2>
          <div className={classes["user_info--follow"]}>
            <p>Followers: 0</p>
            <p>Following: 0</p>
          </div>
          <p className={classes["user_info--bio"]}>bio: Love everything!</p>
        </div>
      </div>
      <section>
        <Button text="COLLECTION" to="/space/collection" />
        <Button text="POSTS" to="/space/posts" />
      </section>
    </Page>
  );
};

export default Space;
