import { apiSlice } from "../api/apiSlice";

export const quizMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //!------ All Quiz Marks ------
    getAllQuizMarks: builder.query({
      query: () => ({
        url: "/quizMark",
      }),
    }),

    //!------ get a single Quiz-mark Details by videoID ------
    getQuizMarkByVideoId: builder.query({
      query: (id) => ({
        url: `/quizMark/?video_id_like=${id}`,
      }),
    }),

    //!------ ADD Quiz Mark ------
    addQuizMark: builder.mutation({
      query: (data) => ({
        url: "/quizMark",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizMarks",
                undefined,
                (draft) => {
                  draft.push(result.data);
                }
              )
            );

            dispatch(
                apiSlice.util.updateQueryData(
                  "getQuizMarkByVideoId",
                  arg.video_id,
                  (draft) => {
                    draft.push(result.data);
                  }
                )
              );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useAddQuizMarkMutation,
  useGetAllQuizMarksQuery,
  useGetQuizMarkByVideoIdQuery,
} = quizMarksApi;
