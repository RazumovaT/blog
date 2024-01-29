import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import styles from "../PostItem/PostItem.module.scss";
import { Link } from "react-router-dom";
import { MarkdownLayer } from "../../../components/MarkdownLayer";

export const PostItem = ({ post }) => {
  return (
    <div className={styles.post}>
      <div className={styles.info}>
        <div className={styles.block}>
          <div className={styles.about}>
            <Link to={`/postView/${post.slug}`} className={styles.title}>
              {post.description.length > 40
                ? post.description.substring(0, 40) + "..."
                : post.description}
            </Link>
            <div className={styles.tagBox}>
              {post.tagList.length
                ? post.tagList.map((tag) => (
                    <div className={styles.tags} key={nanoid()}>
                      {tag.length > 35 ? tag.substring(0, 35) + "..." : tag}{" "}
                    </div>
                  ))
                : ""}
            </div>
          </div>
          <button type="button" className={styles.button}>
            &#9825;
          </button>
          <div className={styles.likes}> {post.favoritesCount}</div>
        </div>
        <div className={styles.block}>
          <div className={styles.user}>
            <p className={styles.author}>{post.author.username}</p>
            <p className={styles.date}>{post.createdAt}</p>
          </div>
          <img src={post.author.image} className={styles.img} />
        </div>
      </div>
      <article className={styles.article}>
        <MarkdownLayer
          props={
            post.body.length > 100
              ? post.body.substring(0, 100) + "..."
              : post.body
          }
        />
      </article>
    </div>
  );
};
