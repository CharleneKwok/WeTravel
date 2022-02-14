import React from "react";
import Button from "../UI/Button";
import classes from "./TravelList.module.scss";

const TravelList = (props) => {
  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.btns}>
        <Button text="Restaurants" />
        <Button text="Hotels" />
        <Button text="Attractions" />
      </div>
    </div>
  );
};

export default TravelList;
