import { apiSlice } from "../api/apiSlice";

export const assignmentApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //!------ render all Assignments ------
    getAllAssignments: builder.query({
      query: () => ({
        url: "/assignments",
      }),
    }),

    //!------ get a single Assignment Details ------
    getSingleAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/${id}`,
      }),
    }),

    //!------ ADD a Assignment ------
    addAssignment: builder.mutation({
      query: (data) => ({
        url: "/assignments",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllAssignments",
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

    //!------ Edit a Assignment ------
    editAssignment: builder.mutation({
      query: ({ id, data }) => ({
        url: `/assignments/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllAssignments",
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
                "getSingleAssignment",
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

    //!------ Delete a Assignment ------
    deleteAssignment: builder.mutation({
      query: (id) => ({
        url: `/assignments/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllAssignments",
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
  useGetAllAssignmentsQuery,
  useAddAssignmentMutation,
  useDeleteAssignmentMutation,
  useGetSingleAssignmentQuery,
  useEditAssignmentMutation,
} = assignmentApi;
