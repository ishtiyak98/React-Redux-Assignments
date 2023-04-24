import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://learningportal.vercel.app",
  }),
  tagTypes: [],
  endpoints: (builder) => ({}),
});
