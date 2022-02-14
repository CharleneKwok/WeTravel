import React from "react";
import Page from "../UI/Page";
import Map from "./Map";
import TravelList from "./TravelList";
import classes from "./Main.module.scss";

const Main = () => {
  return (
    <Page className={classes.main}>
      <TravelList className={classes.list} />
      <Map className={classes.map} />
    </Page>
  );
};

export default Main;
