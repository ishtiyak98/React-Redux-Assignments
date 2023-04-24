import { apiSlice } from "../api/apiSlice";

export const assignmentMarksApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //!------ render all Assignment Mark ------
    getAllAssignmentMarks: builder.query({
      query: () => ({
        url: "/assignmentMark",
      }),
    }),

    //!------ Edit a Assignment Mark ------
    editAssignmentMark: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignmentMark/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllAssignmentMarks",
                undefined,
                (draft) => {
                  const index = draft.findIndex(
                    (item) => parseInt(item.id) === parseInt(arg.id)
                  );
                  draft[index] = { ...result.data };
                }
              )
            );

            // dispatch(
            //   apiSlice.util.updateQueryData(
            //     "getSingleAssignment",
            //     arg.id,
            //     (draft) => {
            //       return (draft = { ...result.data });
            //     }
            //   )
            // );
          }
        } catch (error) {}
      },
    }),
  }),
});

export const { useGetAllAssignmentMarksQuery, useEditAssignmentMarkMutation } = assignmentMarksApi;
