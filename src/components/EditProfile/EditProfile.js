import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../EditProfile/EditProfile.module.scss";
import { Card } from "antd";

export const EditProfile = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const onSubmit = (data) => {
    console.log(data);
    reset();
  };

  return (
    <Card className={styles.box}>
      <div className={styles.title}>Edit profile</div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="username">
          <div className={styles.inputTitle}>Username</div>
          <input
            type="text"
            id="username"
            className={styles.input}
            placeholder="Username"
            {...register("Username", {
              required: "This field is required!",
              minLength: {
                value: 3,
                message: "Your username needs to be at least 3 characters.",
              },
              maxLength: {
                value: 20,
                message: "Your username needs to be less than 20 characters.",
              },
            })}
          />
          {errors?.Username && <p>{errors?.Username?.message}</p>}
        </label>
        <label htmlFor="email">
          <div className={styles.inputTitle}>Email address</div>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className={styles.input}
            {...register("Email", {
              required: "This field is required!",
              pattern: {
                value: /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i,
                message: "Wrong email address format!",
              },
            })}
          />
          {errors?.Email && <p>{errors?.Email?.message}</p>}
        </label>
        <label htmlFor="password">
          <div className={styles.inputTitle}>New password</div>
          <input
            type="password"
            id="password"
            placeholder="New password"
            className={styles.input}
            {...register("Password", {
              required: "This field is required!",
              minLength: {
                value: 6,
                message: "Your password needs to be at least 6 characters.",
              },
              maxLength: {
                value: 20,
                message: "Your password needs to be less than 20 characters.",
              },
            })}
          />
          {errors?.Password && <p>{errors?.Password?.message}</p>}
        </label>
        <label htmlFor="avatarImage">
          <div className={styles.inputTitle}>Avatar image (url)</div>
          <input
            type="url"
            id="avatarImage"
            placeholder="Avatar image"
            className={styles.input}
            {...register("Avatar", {
              required: "This field is required!",
            })}
          />
          {errors?.Avatar && <p>{errors?.Avatar?.message}</p>}
        </label>
        <input
          className={styles.button}
          type="submit"
          value="Save"
          disabled={!isValid}
        />
      </form>
    </Card>
  );
};
