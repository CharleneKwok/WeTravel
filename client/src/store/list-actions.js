import { getSaveList } from "../api/feature-api";
import { attractions, hotels, restaurants } from "../api/mainList-api";
import { listActions } from "./list-slice";

const getNewPlaces = async (type, resp) => {
  const saveList = await getSaveList();
  let placesData = resp?.data.data.filter((item) => item?.name);
  let newPlaces = [];
  placesData.forEach((place) => {
    const newData = {
      location_id: place.location_id,
      name: place.name,
      address: place?.address,
      web_url: place?.web_url,
      image:
        place.photo?.images.original.url ||
        "https://images.unsplash.com/photo-1514933651103-005eec06c04b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80",
      rating: place?.rating,
      cuisine: place?.cuisine,
      phone: place?.phone,
      awards: place?.awards,
      website: place?.website,
      write_review: place?.website,
      price: place?.price,
      price_level: place?.price_level,
      ranking: place?.ranking,
      latitude: place?.latitude,
      longitude: place?.longitude,
      saveToList: false,
      location_string: place?.location_string,
    };
    newPlaces.push(newData);
  });

  if (saveList) {
    const list = saveList.data?.saveList.filter(
      (l) => l.location_type === type
    );
    list.forEach((place) => {
      const foundIdx = newPlaces.findIndex(
        (location) => +location.location_id === +place.location_id
      );
      if (foundIdx >= 0) {
        const location = newPlaces[foundIdx];
        location.saveToList = true;
      }
    });
  }
  return newPlaces;
};

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
    // add save list
    const newPlaces = await getNewPlaces("restaurants", resp);
    if (resp.status === 200) {
      dispatch(listActions.listLoading({ isLoading: false }));
    }
    dispatch(listActions.changeList({ list: newPlaces }));
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
    const newPlaces = await getNewPlaces("hotels", resp);
    if (resp.status === 200) {
      dispatch(listActions.listLoading({ isLoading: false }));
    }
    dispatch(listActions.changeList({ list: newPlaces }));
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
    const newPlaces = await getNewPlaces("attractions", resp);
    if (resp.status === 200) {
      dispatch(listActions.listLoading({ isLoading: false }));
    }
    dispatch(listActions.changeList({ list: newPlaces }));
  } catch (err) {
    console.log(err);
  }
};
