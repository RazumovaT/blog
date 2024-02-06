import { postApi } from "../api/apiSlice";
import { format } from "date-fns";
import { createEntityAdapter, createSelector, nanoid } from "@reduxjs/toolkit";

// export const postsAdapter = createEntityAdapter({
//   selectId: (post) => (post.id = nanoid()),
// });

// export const initialState = postsAdapter.getInitialState();

export const extendedPostApi = postApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: (offset) => `/articles/?limit=5&offset=${offset}`,
      transformResponse: (response) => {
        const transformedPosts = response.articles.map((post) => {
          if (post?.createdAt) {
            post.createdAt = format(new Date(post.createdAt), "PP");
          }
          return post;
        });
        const articlesCount = response.articlesCount;
        // return postsAdapter.setAll(initialState, transformedPosts);
        return { transformedPosts, articlesCount };
      },
      providesTags: (result, error, arg) =>
        result
          ? [
              ...result.transformedPosts.map(({ id }) => ({
                type: "Post",
                id,
              })),
              "Post",
            ]
          : ["Post"],
    }),
    getSinglePost: builder.query({
      query: (slug) => `/articles/${slug}`,
      transformResponse: (post) => {
        return post.article;
      },
    }),
    sendPost: builder.mutation({
      query: ({ data, token }) => ({
        url: "/articles",
        method: "POST",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: {
          article: data,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    updatePost: builder.mutation({
      query: ({ slug, token, data }) => ({
        url: `/articles/${slug}`,
        method: "PUT",
        headers: {
          Authorization: `Token ${token}`,
        },
        body: {
          article: data,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
    deletePost: builder.mutation({
      query: ({ slug, token }) => ({
        url: `/articles/${slug}`,
        method: "DELETE",
        headers: {
          Authorization: `Token ${token}`,
        },
      }),
      invalidatesTags: (result, error, arg) => [{ type: "Post", id: arg.id }],
    }),
  }),
});

// export const selectPostsResult = extendedPostApi.endpoints.getPosts.select();

// export const selectPostsData = createSelector(
//   selectPostsResult,
//   (postsResult) => postsResult.data
// );

// export const {
//   selectAll: selectAllPosts,
//   selectById: selectPostById,
//   selectIds: selectPostsIds,
// } = postsAdapter.getSelectors(
//   (state) => selectPostsData(state) ?? initialState
// );

// export const selectNumberOfPost = createSelector(
//   extendedPostApi.endpoints.getNumberOfPosts.select(),
//   (numberOfPosts) => numberOfPosts.data
// );

export const {
  useGetPostsQuery,
  useGetNumberOfPostsQuery,
  useGetSinglePostQuery,
  useSendPostMutation,
  useDeletePostMutation,
  useUpdatePostMutation,
} = extendedPostApi;
