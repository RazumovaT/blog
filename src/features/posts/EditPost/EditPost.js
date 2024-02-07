import React from "react";
import { Card } from "antd";
import styles from "../EditPost/EditPost.module.scss";
import { PostForm } from "../PostForm/PostForm";
import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../postsSlice";

export const EditPost = () => {
  const { slug } = useParams();
  const token = JSON.parse(localStorage.getItem("token"));
  const { data: post } = useGetSinglePostQuery({ slug: slug, token: token });

  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.header}>Edit article</div>
        <PostForm
          title={post?.title}
          description={post?.description}
          text={post?.body}
          tagList={post?.tagList}
          slug={slug}
        />
      </Card>
    </div>
  );
};
