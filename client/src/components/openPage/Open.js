import React from "react";
import Nav from "../header/Nav";
import Page from "../UI/Page";
import classes from "./Open.module.scss";

const Open = () => {
  return (
    <Page>
      <div className={classes.container}>
        <h1>Welcome To WeTravel</h1>
        <p>
          Here you can find the restaurants, hotels and attractions. Also you
          can see other user's posts to explore the world. Come and join us now!
        </p>
      </div>
    </Page>
  );
};

export default Open;
