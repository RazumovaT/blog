import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const postApi = createApi({
  reducerPath: "postApi",
  baseQuery: fetchBaseQuery({ baseUrl: "https://blog.kata.academy/api" }),
  tagTypes: ["Posts"],
  endpoints: (builder) => ({}),
});
