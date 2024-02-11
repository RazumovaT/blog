import React from "react";
import styles from "../PostForm/PostForm.module.scss";
import { useForm, useFieldArray } from "react-hook-form";
import { useSendPostMutation, useUpdatePostMutation } from "../postsSlice";
import { useNavigate } from "react-router-dom";
import { Spin } from "antd";

export const PostForm = ({
  title,
  description,
  text,
  tagList,
  slug,
  token,
}) => {
  const navigate = useNavigate();
  const [sendPost, { isLoading: sendLoading }] = useSendPostMutation();
  const [updatePost, { isLoading: updateLoading }] = useUpdatePostMutation();

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

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tagList",
    rules: {
      minLength: {
        value: 1,
        message: "Your tag should contain at least 1 letter!",
      },
      required: "Please append at least 1 item!",
    },
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

      await sendPost({ data: newData, token: token }).unwrap();
      navigate("/");
    } catch (e) {
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

      await updatePost({ data: newData, token: token, slug: slug }).unwrap();
      navigate("/");
    } catch (e) {
      console.log(e);
    } finally {
      reset();
    }
  };

  return (
    <>
      {sendLoading || updateLoading ? (
        <Spin fullscreen />
      ) : (
        <form className={styles.form}>
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
                        {...register(`tagList[${index}].name`, {
                          required: "Please append at least 1 item!",
                        })}
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
          <p>{errors.tagList?.root?.message}</p>
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
      )}
    </>
  );
};
