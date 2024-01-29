import { postApi } from "../api/apiSlice";
import { format } from "date-fns";
import { createEntityAdapter, createSelector, nanoid } from "@reduxjs/toolkit";

export const postsAdapter = createEntityAdapter({
  selectId: (post) => (post.id = nanoid()),
});

export const initialState = postsAdapter.getInitialState();

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
        return postsAdapter.setAll(initialState, transformedPosts);
      },
      providesTags: (result) => [
        { type: "Posts", id: "LIST" },
        ...result.ids.map((id) => ({ type: "Posts", id })),
      ],
    }),
    getNumberOfPosts: builder.query({
      query: () => `/articles`,
      transformResponse: (response) => {
        const postsNumber = response.articlesCount;
        return postsNumber;
      },
      providesTags: ["Posts"],
    }),
    getSinglePost: builder.query({
      query: (slug) => `/articles/${slug}`,
      transformResponse: (post) => {
        return post.article;
      },
    }),
    // sendPost: builder.mutation({
    //     query: () => ""
    // })
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
} = extendedPostApi;
