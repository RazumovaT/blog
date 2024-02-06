import React from "react";
import styles from "../PostView/PostView.module.scss";
import { format } from "date-fns";
import { Card, Button, Popconfirm } from "antd";

import { useParams, useNavigate, Link } from "react-router-dom";
import {
  useGetSinglePostQuery,
  useDeletePostMutation,
  useUpdatePostMutation,
} from "../../features/posts/postsSlice";
import { nanoid } from "@reduxjs/toolkit";
import { MarkdownLayer } from "../MarkdownLayer";

export const PostView = ({ logged }) => {
  const { slug } = useParams();
  const navigate = useNavigate();

  const { data: post } = useGetSinglePostQuery(slug);
  const [deletePost, { data: response }] = useDeletePostMutation();

  const onDeleteSubmit = async (slug) => {
    try {
      const token = JSON.parse(localStorage.getItem("token"));
      await deletePost({ slug: slug, token: token }).unwrap();
      navigate("/articles");
    } catch (e) {}
  };

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
          <div className={styles.nameDateContainer}>
            <span className={styles.name}>{post.author.username}</span>
            <span className={styles.date}>
              {format(new Date(post.createdAt), "PP")}
            </span>
          </div>
          <img className={styles.avatar} alt="avatar" src={post.author.image} />
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
          {logged && (
            <div className={styles.buttons}>
              <Popconfirm
                title="Delete the task"
                description="Are you sure to delete this article?"
                okText="Yes"
                cancelText="No"
                placement="rightTop"
                onConfirm={() => onDeleteSubmit(post.slug)}
              >
                <Button danger>Delete</Button>
              </Popconfirm>

              <Link to={`/edit/${post.slug}`}>
                <Button className={styles.editButton}>Edit</Button>
              </Link>
            </div>
          )}
        </div>
        <article className={styles.body}>
          <MarkdownLayer props={post.body} />
        </article>
      </Card>
    )
  );
};
