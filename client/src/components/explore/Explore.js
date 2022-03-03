import React from "react";
import Page from "../UI/Page";
import classes from "./Explore.module.scss";
import NewPost from "./NewPost";
import RandomPost from "./RandomPost";

const Explore = () => {
  return (
    <Page className={classes.container}>
      <NewPost />
      <section>
        <RandomPost />
      </section>
    </Page>
  );
};

export default Explore;
