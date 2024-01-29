import React from "react";
import styles from "../PostView/PostView.module.scss";
import { format } from "date-fns";
import { Card } from "antd";
import Markdown from "markdown-to-jsx";

import { useParams } from "react-router-dom";
import { useGetSinglePostQuery } from "../../features/posts/postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { MarkdownLayer } from "../MarkdownLayer";

export const PostView = () => {
  const { slug } = useParams();


  const { data: post } = useGetSinglePostQuery(slug);


  return (
    post && (
      <Card className={styles.post}>
        <div className={styles.header}>
          <div className={styles.container}>
            <span className={styles.title}>{post.title}</span>
            <div className={styles.likesContainer}>
              <button type="button" className={styles.likesButton}>
                &#9825;
              </button>
              <span className={styles.likes}>{post.favoritesCount}</span>
            </div>
          </div>
          <span className={styles.name}>{post.author.username}</span>
          <img className={styles.avatar} alt="avatar" src={post.author.image} />
          <div className={styles.tagBox}>
            {post.tagList.length
              ? post.tagList.map((tag) => (
                  <div className={styles.tags} key={nanoid()}>
                    {tag.length > 35 ? tag.substring(0, 35) + "..." : tag}{" "}
                  </div>
                ))
              : ""}
          </div>
          <span className={styles.date}>
            {format(new Date(post.createdAt), "PP")}
          </span>
        </div>
        <article className={styles.description}>
          <MarkdownLayer props={post.description} />
        </article>
        <article className={styles.body}>
          <MarkdownLayer props={post.body} />
        </article>
      </Card>
    )
  );
};
