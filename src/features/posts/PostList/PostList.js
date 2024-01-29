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

export const PostList = () => {
  const { data: numberOfPosts } = useGetNumberOfPostsQuery();

  const [page, setPage] = useState(1);

  const offsetCount = (page - 1) * 10;

  const { isLoading, isSuccess } = useGetPostsQuery(offsetCount);

  const selectPostsResult =
    extendedPostApi.endpoints.getPosts.select(offsetCount);

  const selectPostsData = createSelector(
    selectPostsResult,
    (postsResult) => postsResult.data
  );

  const {
    selectAll: selectAllPosts,
    selectById: selectPostById,
    selectIds: selectPostsIds,
  } = postsAdapter.getSelectors(
    (state) => selectPostsData(state) ?? initialState
  );

  const posts = useSelector(selectAllPosts);
  const selectPosts = useSelector(selectPostById);
  console.log(selectPosts);

  let content;

  if (isLoading) {
    content = <h2>Loading...</h2>;
  } else if (isSuccess) {
    content = (
      <div className={styles.list}>
        <div className={styles.posts}>
          {isSuccess &&
            posts.map((post) => {
              return <PostItem key={nanoid()} post={post} />;
            })}
          <Pagination
            style={{ marginTop: "2rem" }}
            current={page}
            onChange={(page) => setPage(page)}
            total={numberOfPosts}
            showSizeChanger={false}
          />
        </div>
      </div>
    );
  }

  return <div>{content}</div>;
};
