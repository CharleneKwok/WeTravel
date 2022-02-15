import React, { useEffect, useState } from "react";
import classes from "./Map.module.scss";
import GoogleMapReact from "google-map-react";
import { useDispatch, useSelector } from "react-redux";
import { listActions } from "../../store/list-slice";
import MapLoader from "../UI/MapLoader";

const Map = (props) => {
  const [center, setCenter] = useState({});
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenter({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  return (
    <div className={`${classes.container} ${props.className}`}>
      {/* <MapLoader /> */}
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={center}
        center={center}
        defaultZoom={14}
        // need ne and sw
        onChange={({ bounds }) => {
          dispatch(
            listActions.changeLocation({
              swLoction: bounds.sw,
              neLocation: bounds.ne,
            })
          );
        }}
        // onChildClick={(e) => console.log(e)}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
