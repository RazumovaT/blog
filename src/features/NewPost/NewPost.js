import React from "react";
import styles from "../NewPost/NewPost.module.scss";
import { Card } from "antd";
import { PostForm } from "../../components/PostForm/PostForm";
import { Navigate } from "react-router-dom";

export const NewPost = ({ logged }) => {
  if (!logged) {
    return <Navigate to="signIn" replace />;
  }
  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.header}>Create new article</div>
        <PostForm />
      </Card>
    </div>
  );
};
