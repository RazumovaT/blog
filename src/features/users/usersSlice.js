import { postApi } from "../api/apiSlice";

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
        body: {
          user: {
            username: data.username,
            email: data.email,
            avatar: data.avatar,
            bio: "",
            image: data.image,
          },
        },
      }),
    }),
  }),
});

export const {
  useRegisterNewUserMutation,
  useLoginExistingUserMutation,
  useEditUsersProfileMutation,
} = extendedUserApi;
