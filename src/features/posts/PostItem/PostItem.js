import { nanoid } from "@reduxjs/toolkit";
import React from "react";
import styles from "../PostItem/PostItem.module.scss";
import { Link } from "react-router-dom";
import { MarkdownLayer } from "../../../components/MarkdownLayer";
import {
  useFavoritePostMutation,
  useUnfavoritePostMutation,
} from "../postsSlice";

export const PostItem = ({ post, logged }) => {
  const [favoritePost, { data: response }] = useFavoritePostMutation();
  const [unfavoritePost, { data }] = useUnfavoritePostMutation();

  const onPostFavorite = async (slug) => {
    try {
      let token = JSON.parse(window.localStorage.getItem("token"));

      await favoritePost({ slug: slug, token: token }).unwrap();
    } finally {
    }
  };

  const onPostUnfavorite = async (slug) => {
    try {
      let token = JSON.parse(window.localStorage.getItem("token"));
      await unfavoritePost({ slug: slug, token: token }).unwrap();
    } finally {
    }
  };

  const likesButton = (cb) => {
    return (
      <button
        type="button"
        className={styles.button}
        onClick={() => cb(post.slug)}
        disabled={!logged}
      >
        {post.favorited ? "❤️" : "♡"}
      </button>
    );
  };

  return (
    <div className={styles.post}>
      <div className={styles.info}>
        <div className={styles.block}>
          <div className={styles.about}>
            <Link to={`/postView/${post.slug}`} className={styles.title}>
              {post?.title?.length > 40
                ? post.title.substring(0, 40) + "..."
                : post.title}
            </Link>
            <div className={styles.tagBox}>
              {post.tagList.length
                ? post?.tagList.map((tag) => (
                    <div className={styles.tags} key={nanoid()}>
                      {tag?.length > 35 ? tag.substring(0, 35) + "..." : tag}{" "}
                    </div>
                  ))
                : ""}
            </div>
          </div>
          {post?.favorited
            ? likesButton(onPostUnfavorite)
            : likesButton(onPostFavorite)}
          <div className={styles.likes}> {post.favoritesCount}</div>
        </div>
        <div className={styles.block}>
          <div className={styles.user}>
            <p className={styles.author}>{post.author.username}</p>
            <p className={styles.date}>{post.createdAt}</p>
          </div>
          <img
            src={
              post?.author?.image ||
              "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
            }
            className={styles.img}
            alt="avatar"
          />
        </div>
      </div>
      <article className={styles.article}>
        <MarkdownLayer
          props={
            post?.body?.length > 100
              ? post.body.substring(0, 100) + "..."
              : post.body
          }
        />
      </article>
    </div>
  );
};
