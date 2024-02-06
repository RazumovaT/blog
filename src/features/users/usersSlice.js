import { postApi } from "../api/apiSlice";
import { format } from "date-fns";
import { createEntityAdapter, createSelector, nanoid } from "@reduxjs/toolkit";

export const extendedUserApi = postApi.injectEndpoints({
  endpoints: (builder) => ({
    registerNewUser: builder.mutation({
      query: (data) => ({
        url: "/users",
        method: "POST",
        body: {
          user: data,
        },
      }),
    }),
    loginExistingUser: builder.mutation({
      query: (data) => ({
        url: "/users/login",
        method: "POST",
        body: {
          user: data,
        },
      }),
    }),
    editUsersProfile: builder.mutation({
      query: ({ data, token }) => ({
        url: "/user",
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
          Accept: `application/json;charset=utf-8`,
        },
        body: { data },
      }),
    }),
  }),
});

export const {
  useRegisterNewUserMutation,
  useLoginExistingUserMutation,
  useEditUsersProfileMutation,
} = extendedUserApi;
