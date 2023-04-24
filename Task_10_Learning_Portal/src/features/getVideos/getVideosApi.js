import { apiSlice } from "../api/apiSlice";
import { getSelectedVideo } from "./getVideosSlice";

export const getVideosApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    //!------ render all videos ------
    getAllVideos: builder.query({
      query: () => ({
        url: "/videos",
      }),
    }),

    //!------ ADD a video ------
    addVideo: builder.mutation({
      query: (data) => ({
        url: "/videos",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllVideos",
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

    //!------ Edit a video ------
    editVideo: builder.mutation({
      query: ({ id, data }) => ({
        url: `/videos/${id}`,
        method: "PUT",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllVideos",
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
                "getSingleVideo",
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

    //!------ Delete a video ------
    deleteVideo: builder.mutation({
      query: (id) => ({
        url: `/videos/${id}`,
        method: "DELETE",
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(
              apiSlice.util.updateQueryData(
                "getAllVideos",
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

    //!------ get a single Assignment Details by videoID ------
    getAssignment: builder.query({
      query: (id) => ({
        url: `/assignments/?video_id_like=${id}`,
      }),
    }),

    //!------ submit Assignment Details ------
    submitAssignment: builder.mutation({
      query: (data) => ({
        url: `https://learningportal.vercel.app/assignmentMark`,
        method: "POST",
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
                  draft.push(result.data);
                }
              )
            );
          }
        } catch (error) {}
      },
    }),

    //!------ get a single Video Details ------
    getSingleVideo: builder.query({
      query: (id) => ({
        url: `/videos/${id}`,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;
          if (result.data) {
            dispatch(getSelectedVideo(result.data));
          }
        } catch (error) {}
      },
    }),
  }),
});

export const {
  useGetAllVideosQuery,
  useGetSingleVideoQuery,
  useGetAssignmentQuery,
  useSubmitAssignmentMutation,
  useDeleteVideoMutation,
  useAddVideoMutation,
  useEditVideoMutation,
} = getVideosApi;
