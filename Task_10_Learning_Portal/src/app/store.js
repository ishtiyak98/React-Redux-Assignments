import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";
import authSlice from "../features/auth/authSlice";
import getVideosSlice from "../features/getVideos/getVideosSlice";
import quizSlice from "../features/quize/quizSlice";
import leaderBoardSlice from "../features/leaderBoardMarks/leaderBoardSlice";

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authSlice,
    getVideos: getVideosSlice,
    quiz: quizSlice,
    leaderBoard: leaderBoardSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});
