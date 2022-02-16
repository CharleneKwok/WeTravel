import React from "react";
import classes from "./Map.module.scss";
import SvgIcon from "@mui/material/SvgIcon";
import LocationOnIcon from "@mui/icons-material/LocationOn";

const Marker = ({ i, item }) => {
  return (
    <div className={classes.location}>
      <SvgIcon className={classes.hover}>
        <LocationOnIcon />
      </SvgIcon>
      <p className={classes.card}>{item.name}</p>
    </div>
  );
};

export default Marker;
