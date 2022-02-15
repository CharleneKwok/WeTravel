import { createSlice } from "@reduxjs/toolkit";

const listSlice = createSlice({
  name: "mainList",
  initialState: {
    list: [],
    swLocation: {},
    neLocation: {},
    isLoading: false,
  },
  reducers: {
    listLoading(state, action) {
      state.isLoading = action.payload.isLoading;
    },
    changeList(state, action) {
      let list = [];
      if (action.payload.list) {
        list = action.payload.list.filter((item) => item?.name);
      }
      state.list = list;
      console.log("🚀 ~ state.list", state.list);
    },
    changeLocation(state, action) {
      state.swLocation = action.payload.swLoction;
      state.neLocation = action.payload.neLocation;
    },
  },
});

export const listActions = listSlice.actions;
export default listSlice.reducer;
