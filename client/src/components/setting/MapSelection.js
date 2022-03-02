import React, { useState } from "react";
import classes from "./MapSelection.module.scss";
import LightDream from "../../assets/mapStyles/LightDream.jpg";
import Becomeadinosaur from "../../assets/mapStyles/Becomeadinosaur.jpg";
import MutiBrandNetwork from "../../assets/mapStyles/MutiBrandNetwork.jpg";
import UnsaturatedBrowns from "../../assets/mapStyles/UnsaturatedBrowns.jpg";
import DoneOutlineIcon from "@mui/icons-material/DoneOutline";
import { changeMap } from "../../api/feature-api";
import { useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth-slice";

const MapSelection = ({ text, idx, isSelected }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const mapImages = [
    LightDream,
    MutiBrandNetwork,
    Becomeadinosaur,
    UnsaturatedBrowns,
  ];

  const changeMapHandler = async () => {
    try {
      const name = text.replace(/\s/g, "");
      const resp = await changeMap({ mapAppearance: name });
      if (resp.status === 200) {
        dispatch(authActions.changeMapAppearance({ mapAppearance: name }));
        console.log("change");
      }
    } catch ({ response }) {
      if (response.status === 401) {
        history.push("/login");
      }
    }
  };

  return (
    <div className={classes.container} onClick={changeMapHandler}>
      <img src={mapImages[idx]} alt="map style" />
      {isSelected && <DoneOutlineIcon className={classes.icon} />}
      <p>{text}</p>
    </div>
  );
};

export default MapSelection;
