import React, { useState } from "react";
import styles from "../PostForm/PostForm.module.scss";
import { Card } from "antd";
import { nanoid } from "@reduxjs/toolkit";

export const PostForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [text, setText] = useState("");
  const [tag, setTag] = useState("");
  const [tagArray, setTagArray] = useState([]);

  let tagContent = tagArray.map((el) => {
    return (
      <div className={styles.tags} key={nanoid()}>
        <label htmlFor="tag">
          <input
            type="text"
            id="tag"
            placeholder="Tag"
            className={styles.tag}
            value={el}
            onChange={(e) => setTag(e.target.value)}
          />
        </label>
        <button
          type="button"
          className={styles.deleteButton}
          onClick={() => handleTagDelete(el)}
        >
          Delete
        </button>
      </div>
    );
  });

  const handleTagSubmit = (e) => {
    e.preventDefault();
    setTagArray([...tagArray, tag]);
    setTag("");
  };

  const handleTagDelete = (el) => {
    const newTagArray = tagArray.filter((tag) => el !== tag);
    setTagArray(newTagArray);
  };

  return (
    <div>
      <Card className={styles.card}>
        <div className={styles.header}>Create new article</div>
        <form>
          <label htmlFor="title">
            <div>Title</div>
            <input
              type="text"
              id="title"
              placeholder="Title"
              className={styles.title}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </label>
          <label htmlFor="description">
            <div>Short description</div>
            <input
              type="text"
              id="description"
              placeholder="Title"
              className={styles.title}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label htmlFor="text">
            <div>Text</div>
            <textarea
              type="text"
              id="text"
              placeholder="Text"
              className={styles.text}
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </label>

          <div>Tags</div>
          <div className={styles.tags}>
            <label htmlFor="tag">
              <input
                type="text"
                id="tag"
                placeholder="Tag"
                className={styles.tag}
                value={tag}
                onChange={(e) => setTag(e.target.value)}
                required
              />
            </label>
            <button type="button" className={styles.deleteButton}>
              Delete
            </button>
            <button
              type="button"
              className={styles.addButton}
              onClick={(e) => handleTagSubmit(e)}
            >
              Add tag
            </button>
          </div>
          {tagContent}
          <button type="button" className={styles.sendButton}>
            Send
          </button>
        </form>
      </Card>
    </div>
  );
};
