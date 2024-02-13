import React from "react";
import { Card } from "antd";
import styles from "../EditPost/EditPost.module.scss";
import { PostForm } from "../PostForm/PostForm";
import { useParams, Navigate } from "react-router-dom";
import { useGetSinglePostQuery } from "../postsSlice";

export const EditPost = ({ token, user }) => {
  const { slug } = useParams();
  const { data: post } = useGetSinglePostQuery({ slug: slug, token: token });

  if (post?.author?.username !== user.username) {
    return <Navigate to="/" replace />;
  }
  
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
          token={token}
        />
      </Card>
    </div>
  );
};
