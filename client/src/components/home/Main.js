import React, { useEffect, useState } from "react";
import Page from "../UI/Page";
import TravelList from "./TravelList";
import classes from "./Main.module.scss";
import { useDispatch, useSelector } from "react-redux";
import GoogleMapReact from "google-map-react";
import Marker from "./Marker";
import { listActions } from "../../store/list-slice";

const Main = () => {
  const [center, setCenter] = useState({});
  const dispatch = useDispatch();
  const list = useSelector((state) => state.mainList.list);
  const [childClick, setChildClick] = useState("");

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      ({ coords: { latitude, longitude } }) => {
        setCenter({ lat: latitude, lng: longitude });
      }
    );
  }, []);
  return (
    <Page className={classes.main}>
      <TravelList className={classes.list} childClick={childClick} />
      <div className={classes.container}>
        {/* <MapLoader /> */}
        <GoogleMapReact
          bootstrapURLKeys={{ key: process.env.REACT_APP_GOOGLE_MAP_API_KEY }}
          defaultCenter={center}
          center={center}
          defaultZoom={17}
          // need ne and sw
          onChange={({ bounds }) => {
            dispatch(
              listActions.changeLocation({
                swLoction: bounds.sw,
                neLocation: bounds.ne,
              })
            );
          }}
          onChildClick={(e) => setChildClick(e)}
        >
          {list?.map((item, i) => (
            <Marker
              i={i}
              item={item}
              key={i}
              lat={item.latitude}
              lng={item.longitude}
            />
          ))}
        </GoogleMapReact>
      </div>
    </Page>
  );
};

export default Main;
