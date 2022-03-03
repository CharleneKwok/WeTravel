import React from "react";
import classes from "./Main.module.scss";
import SvgIcon from "@mui/material/SvgIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Marker = ({ i, item }) => {
  const user = JSON.parse(localStorage.getItem("profile"));
  return (
    <div
      className={`${classes.location} ${
        user.mapAppearance === "MutiBrandNetwork" ? classes["dark-mode"] : ""
      }`}
    >
      <SvgIcon className={classes.hover}>
        <LocationOnIcon />
      </SvgIcon>
      <p className={classes.card}>{item.name}</p>
    </div>
  );
};

export default Marker;
