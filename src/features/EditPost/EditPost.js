import React from "react";
import { Card } from "antd";
import styles from "../EditPost/EditPost.module.scss";
import { PostForm } from "../../components/PostForm/PostForm";
import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../posts/postsSlice";

export const EditPost = () => {
  const { slug } = useParams();
  const { data: post } = useGetSinglePostQuery(slug);
  console.log(post);
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.header}>Edit article</div>
        <PostForm
          title={post?.title}
          description={post?.description}
          text={post?.body}
          tagList={post?.tagList}
        />
      </Card>
    </div>
  );
};
