import { apiSlice } from "../api/apiSlice";

export const leaderBoardMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAssignmentMarks: builder.query({
      query: () => ({
        url: "/assignmentMark",
      }),
    }),

    getQuizMarks: builder.query({
      query: () => ({
        url: "/quizMark",
      }),
    }),
  }),
});

export const { useGetAssignmentMarksQuery, useGetQuizMarksQuery } = leaderBoardMarksApi;
