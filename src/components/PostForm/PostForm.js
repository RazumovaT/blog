import React from "react";
import styles from "../PostForm/PostForm.module.scss";
import { Card } from "antd";
import { useForm, useFieldArray } from "react-hook-form";
import {
  useSendPostMutation,
  useUpdatePostMutation,
} from "../../features/posts/postsSlice";
import { useNavigate, useParams } from "react-router-dom";

export const PostForm = ({ title, description, text, tagList }) => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [sendPost, { data: post }] = useSendPostMutation();
  const [updatePost, { data: editPost }] = useUpdatePostMutation();

  const newList = tagList?.map((el) => ({ name: el }));
  const {
    register,
    control,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    defaultValues: {
      title: title || "",
      description: description || "",
      text: text || "",
      tagList: newList || [{ name: "" }],
    },
    mode: "onBlur",
  });

  const isEdit = Boolean(title && description && text);
  console.log(isEdit);

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
    // rules: {
    //   minLength: {
    //     value: 1,
    //     message: "Your tag should contain at least 1 letter!",
    //   },
    //   required: true,
    // },
  });

  const onPostCreateSubmit = async (data) => {
    try {
      const tagsFromObject = data.tagList.map((el) => {
        return el.name;
      });
      const newData = {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagsFromObject,
      };

      const token = JSON.parse(localStorage.getItem("token"));
      await sendPost({ data: newData, token: token }).unwrap();
      navigate("/articles");
    } finally {
      reset();
    }
  };

  const onPostEditSubmit = async (data) => {
    try {
      const tagsFromObject = data.tagList.map((el) => {
        return el.name;
      });
      const newData = {
        title: data.title,
        description: data.description,
        body: data.text,
        tagList: tagsFromObject,
      };

      const token = JSON.parse(localStorage.getItem("token"));
      await updatePost({ data: newData, token: token, slug: slug }).unwrap();
      navigate("/articles");
    } finally {
      reset();
    }
  };

  return (
    <form>
      <label htmlFor="title">
        <div>Title</div>
        <input
          type="text"
          id="title"
          placeholder="Title"
          className={styles.title}
          {...register("title", {
            required: "This field is required!",
            maxLength: {
              value: 5000,
              message: "Your title is too long",
            },
            minLength: {
              value: 1,
              message: "Your title should contain at least 1 letter!",
            },
          })}
        />
        {errors?.title && <p>{errors?.title?.message}</p>}
      </label>
      <label htmlFor="description">
        <div>Short description</div>
        <input
          type="text"
          id="description"
          placeholder="Description"
          className={styles.title}
          {...register("description", {
            required: "This field is required!",
            maxLength: {
              value: 5000,
              message: "Your text is too long",
            },
            minLength: {
              value: 1,
              message: "Your text should contain at least 1 letter!",
            },
          })}
        />
        {errors?.description && <p>{errors?.description?.message}</p>}
      </label>
      <label htmlFor="text">
        <div>Text</div>
        <textarea
          type="text"
          id="text"
          placeholder="Text"
          className={styles.text}
          {...register("text", {
            required: "This field is required!",
            maxLength: {
              value: 5000,
              message: "Your text is too long",
            },
            minLength: {
              value: 1,
              message: "Your text should contain at least 1 letter!",
            },
          })}
        />
        {errors?.text && <p>{errors?.text?.message}</p>}
      </label>
      <div className={styles.tagsBox}>
        <div>
          {fields.map((field, index) => {
            return (
              <section key={field.id}>
                <label htmlFor="tag">
                  <input
                    ref={register}
                    className={styles.tag}
                    placeholder="Tag"
                    id="tag"
                    {...register(`tagList[${index}].name`)}
                  />
                  <button
                    type="button"
                    className={styles.deleteButton}
                    onClick={() => remove(index)}
                  >
                    Delete
                  </button>
                </label>
              </section>
            );
          })}
        </div>
        <button
          type="button"
          className={styles.addButton}
          onClick={() =>
            append({
              tag: "tag",
            })
          }
        >
          Add tag
        </button>
      </div>
      {isEdit ? (
        <input
          type="submit"
          className={styles.sendButton}
          value="Send"
          disabled={!isValid}
          onClick={handleSubmit(onPostEditSubmit)}
        />
      ) : (
        <input
          type="submit"
          className={styles.sendButton}
          value="Send"
          disabled={!isValid}
          onClick={handleSubmit(onPostCreateSubmit)}
        />
      )}
    </form>
  );
};
