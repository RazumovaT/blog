import React, { useEffect, useState } from "react";
import styles from "../PostList/PostList.module.scss";
import { Pagination } from "antd";
import {
  useGetPostsQuery,
  useGetNumberOfPostsQuery,
  // selectPostsIds,
  // selectAllPosts,
  // selectNumberOfPost,
  extendedPostApi,
  postsAdapter,
  initialState,
} from "../postsSlice";
import { useSelector } from "react-redux";
import { PostItem } from "../PostItem/PostItem";
import { nanoid } from "@reduxjs/toolkit";
import { createSelector } from "@reduxjs/toolkit";
import { Spin } from "antd";

export const PostList = () => {
  const [page, setPage] = useState(1);

  const offsetCount = (page - 1) * 10;

  const { data: posts, isLoading, isSuccess } = useGetPostsQuery(offsetCount);

  // const selectPostsResult =
  //   extendedPostApi.endpoints.getPosts.select(offsetCount);

  // const selectPostsData = createSelector(
  //   selectPostsResult,
  //   (postsResult) => postsResult.data
  // );

  // const {
  //   selectAll: selectAllPosts,
  //   selectById: selectPostById,
  //   selectIds: selectPostsIds,
  // } = postsAdapter.getSelectors(
  //   (state) => selectPostsData(state) ?? initialState
  // );

  // const posts = useSelector(selectAllPosts);
  console.log(posts?.transformedPosts);

  let content;

  if (isLoading) {
    content = <Spin fullscreen />;
  } else if (isSuccess) {
    content = (
      <div className={styles.list}>
        <div className={styles.posts}>
          {isSuccess &&
            posts.transformedPosts.map((post) => {
              return <PostItem key={nanoid()} post={post} />;
            })}
          <Pagination
            style={{ marginTop: "2rem" }}
            current={page}
            onChange={(page) => setPage(page)}
            total={posts?.articlesCount}
            showSizeChanger={false}
          />
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};
