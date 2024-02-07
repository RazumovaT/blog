import React, { useState } from "react";
import styles from "../PostList/PostList.module.scss";
import { Pagination } from "antd";
import { useGetPostsQuery } from "../postsSlice";
import { PostItem } from "../PostItem/PostItem";
import { nanoid } from "@reduxjs/toolkit";
import { Spin } from "antd";

export const PostList = ({ logged }) => {
  const [page, setPage] = useState(1);

  const offset = (page - 1) * 5;

  let token = JSON.parse(window.localStorage.getItem("token"));

  const {
    data: posts,
    isLoading,
    isSuccess,
  } = useGetPostsQuery({ offset: offset, token: token });

  let content;

  if (isLoading) {
    content = <Spin fullscreen />;
  } else if (isSuccess) {
    content = (
      <div className={styles.list}>
        <div className={styles.posts}>
          {isSuccess &&
            posts.transformedPosts.map((post) => {
              return <PostItem key={nanoid()} post={post} logged={logged} />;
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
