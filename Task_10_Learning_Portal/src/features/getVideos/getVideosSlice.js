import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedVideo: {},
};

const getVideosSlice = createSlice({
  name: "get-videos",
  initialState,
  reducers: {
    getSelectedVideo: (state, action) => {
      state.selectedVideo = { ...action.payload };
    },
  },
});

export const { getSelectedVideo } = getVideosSlice.actions;
export default getVideosSlice.reducer;
