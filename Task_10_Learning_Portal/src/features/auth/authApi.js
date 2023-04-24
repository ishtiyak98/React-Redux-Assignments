import { toast } from "react-toastify";
import { apiSlice } from "../api/apiSlice";
import { userLoggedIn } from "./authSlice";

export const authApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation({
      query: (data) => ({
        url: "/register",
        method: "POST",
        body: data,
      }),
    }),

    login: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.user.role === "student") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );

            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          } else {
            let error = new Error();
            error = { error: { data: "Student login only" } };
            throw error;
          }
        } catch (error) {
          toast.error(`${error?.error?.data}`);
        }
      },
    }),

    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const result = await queryFulfilled;

          if (result.data.user.role === "admin") {
            localStorage.setItem(
              "auth",
              JSON.stringify({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );

            dispatch(
              userLoggedIn({
                accessToken: result.data.accessToken,
                user: result.data.user,
              })
            );
          } else {
            let error = new Error();
            error = { error: { data: "Admin login only" } };
            throw error;
          }
        } catch (error) {
          toast.error(`${error?.error?.data}`);
        }
      },
    }),
  }),
});

export const { useLoginMutation, useAdminLoginMutation, useRegisterMutation } =
  authApi;
