import React, { useEffect } from "react";
import Button from "../UI/Button";
import classes from "./TravelList.module.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  getAttractions,
  getHotels,
  getRestaurants,
} from "../../store/list-actions";
import { useLocation } from "react-router-dom";
import MyLoader from "../UI/MyLoader";
import Item from "./Item";

const TravelList = (props) => {
  const dispatch = useDispatch();
  const getList = useSelector((state) => state.mainList);
  const location = useLocation();
  const items = getList.list.filter((item) => item?.name);

  useEffect(() => {
    if (location.pathname.includes("restaurants")) {
      dispatch(getRestaurants(getList.swLocation, getList.neLocation));
    } else if (location.pathname.includes("hotels")) {
      dispatch(getHotels(getList.swLocation, getList.neLocation));
    } else if (location.pathname.includes("attractions")) {
      dispatch(getAttractions(getList.swLocation, getList.neLocation));
    }
  }, [getList.swLocation, getList.neLocation, location.pathname, dispatch]);

  return (
    <div className={`${classes.container} ${props.className}`}>
      <div className={classes.btns}>
        <Button to="/home/restaurants" text="Restaurants" />
        <Button to="/home/hotels" text="Hotels" />
        <Button to="/home/attractions" text="Attractions" />
      </div>
      <div className={classes.list}>
        {!getList.isLoading ? (
          items.map((item, i) => <Item info={item} key={i} />)
        ) : (
          <>
            <div className={classes["loader-container"]}>
              <MyLoader />
            </div>
            <div className={classes["loader-container"]}>
              <MyLoader />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default TravelList;
