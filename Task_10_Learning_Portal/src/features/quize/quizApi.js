import { apiSlice } from "../api/apiSlice";

export const quizApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //!------ get all Quiz Details ------
    getAllQuizzes: builder.query({
      query: () => ({
        url: "/quizzes",
      }),
    }),

    //!------ get a single Quiz Details ------
    getSingleQuiz: builder.query({
      query: (id) => ({
        url: `/quizzes/${id}`,
      }),
    }),

    //!------ ADD a Quiz ------
    addQuiz: builder.mutation({
      query: (data) => ({
        url: "/quizzes",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizzes",
                undefined,
                (draft) => {
                  draft.push(result.data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //!------ Edit a Quiz ------
    editQuiz: builder.mutation({
      query: ({ id, data }) => ({
        url: `/quizzes/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizzes",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (item) => parseInt(item.id) === parseInt(arg.id)
                  );
                  draft[index] = { ...result.data };
                }
              )
            );

            dispatch(
              apiSlice.util.updateQueryData(
                "getSingleQuiz",
                arg.id,
                (draft) => {
                  return (draft = { ...result.data });
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //!------ Delete a Quiz ------
    deleteQuiz: builder.mutation({
      query: (id) => ({
        url: `/quizzes/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllQuizzes",
                undefined,
                (draft) => {
                  const index = draft.findIndex((item) => item.id === arg);
                  draft.splice(index, 1);
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
  useGetAllQuizzesQuery,
  useGetSingleQuizQuery,
  useDeleteQuizMutation,
  useAddQuizMutation,
  useEditQuizMutation,
} = quizApi;
