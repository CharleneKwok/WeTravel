import { attractions, hotels, restaurants } from "../api/mainList-api";
import { listActions } from "./list-slice";

export const getRestaurants = (swLocation, neLocation) => async (dispatch) => {
  try {
    const params = {
      bl_latitude: swLocation.lat,
      tr_latitude: neLocation.lat,
      bl_longitude: swLocation.lng,
      tr_longitude: neLocation.lng,
    };
    dispatch(listActions.listLoading({ isLoading: true }));
    const resp = await restaurants(params);
    if (resp.status === 200) {
      dispatch(listActions.listLoading({ isLoading: false }));
    }
    // add save list
    dispatch(listActions.changeList({ list: resp.data.data }));
  } catch (err) {
    console.log(err);
  }
};

export const getHotels = (swLocation, neLocation) => async (dispatch) => {
  try {
    const params = {
      bl_latitude: swLocation.lat,
      tr_latitude: neLocation.lat,
      bl_longitude: swLocation.lng,
      tr_longitude: neLocation.lng,
    };
    dispatch(listActions.listLoading({ isLoading: true }));

    const resp = await hotels(params);
    // add save list
    if (resp.status === 200) {
      dispatch(listActions.listLoading({ isLoading: false }));
    }
    dispatch(listActions.changeList({ list: resp.data.data }));
  } catch (err) {
    console.log(err);
  }
};

export const getAttractions = (swLocation, neLocation) => async (dispatch) => {
  try {
    const params = {
      bl_latitude: swLocation.lat,
      tr_latitude: neLocation.lat,
      bl_longitude: swLocation.lng,
      tr_longitude: neLocation.lng,
    };
    dispatch(listActions.listLoading({ isLoading: true }));

    const resp = await attractions(params);
    // add save list
    if (resp.status === 200) {
      dispatch(listActions.listLoading({ isLoading: false }));
    }
    dispatch(listActions.changeList({ list: resp.data.data }));
  } catch (err) {
    console.log(err);
  }
};
