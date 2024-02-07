import React from "react";
import styles from "../PostView/PostView.module.scss";
import { format } from "date-fns";
import { Card, Button, Popconfirm } from "antd";
import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetSinglePostQuery,
  useDeletePostMutation,
  useFavoritePostMutation,
  useUnfavoritePostMutation,
} from "../postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { MarkdownLayer } from "../../../components/MarkdownLayer";

export const PostView = ({ logged }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const token = JSON.parse(localStorage.getItem("token"));
  const user = JSON.parse(localStorage.getItem("user"));

  const { data: post } = useGetSinglePostQuery({ slug, token });
  const [deletePost, { data }] = useDeletePostMutation();
  const [favoritePost] = useFavoritePostMutation();
  const [unfavoritePost] = useUnfavoritePostMutation();

  const onDeleteSubmit = async (slug) => {
    try {
      await deletePost({ slug: slug, token: token }).unwrap();
      navigate("/articles");
    } catch (e) {
      console.log(e);
    }
  };

  const onPostFavorite = async (slug) => {
    try {
      await favoritePost({ slug: slug, token: token }).unwrap();
    } finally {
    }
  };

  const onPostUnfavorite = async (slug) => {
    try {
      await unfavoritePost({ slug: slug, token: token }).unwrap();
    } finally {
    }
  };

  const likesButton = (cb) => {
    return (
      <button
        type="button"
        className={styles.likesButton}
        onClick={() => cb(post.slug)}
        disabled={!logged}
      >
        {post.favorited ? "❤️" : "♡"}
      </button>
    );
  };

  console.log(data);

  return (
    post && (
      <Card className={styles.post}>
        <div className={styles.header}>
          <div className={styles.container}>
            <span className={styles.title}>{post.title}</span>
            <div className={styles.likesContainer}>
              {post.favorited
                ? likesButton(onPostUnfavorite)
                : likesButton(onPostFavorite)}
              <span className={styles.likes}>{post.favoritesCount}</span>
            </div>
          </div>
          <div className={styles.nameDateContainer}>
            <p className={styles.name}>{post.author.username}</p>
            <p className={styles.date}>
              {format(new Date(post.createdAt), "PP")}
            </p>
          </div>
          <img
            className={styles.avatar}
            alt="avatar"
            src={
              post.author.image ||
              "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
            }
          />
          <div className={styles.tagBox}>
            {post.tagList.length
              ? post.tagList.map((tag) => (
                  <div className={styles.tags} key={nanoid()}>
                    {tag}
                  </div>
                ))
              : ""}
          </div>
        </div>
        <div className={styles.descriptionContainer}>
          <article className={styles.description}>{post.description}</article>
          {logged && user?.username === post.author.username ? (
            <div className={styles.buttons}>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                placement="rightBottom"
                onConfirm={() => onDeleteSubmit(post.slug)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>

              <Link to={`/edit/${post.slug}`}>
                <Button className={styles.editButton}>Edit</Button>
              </Link>
            </div>
          ) : (
            ""
          )}
        </div>
        <article className={styles.body}>
          <MarkdownLayer props={post.body} />
        </article>
      </Card>
    )
  );
};
