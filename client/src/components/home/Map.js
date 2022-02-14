import React, { useEffect, useState } from "react";
import classes from "./Map.module.scss";
import GoogleMapReact from "google-map-react";

const Map = (props) => {
  const [center, setCenter] = useState({});
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenter({ lat: latitude, lng: longitude });
      }
    );
  }, []);

  return (
    <div className={`${classes.container} ${props.className}`}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
        defaultCenter={center}
        center={center}
        defaultZoom={14}
        // onChange={(e) => console.log(e)}
        // onChildClick={(e) => console.log(e)}
      ></GoogleMapReact>
    </div>
  );
};

export default Map;
