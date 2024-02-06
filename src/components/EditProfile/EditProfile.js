import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../EditProfile/EditProfile.module.scss";
import { Card } from "antd";
import { useEditUsersProfileMutation } from "../../features/users/usersSlice";

export const EditProfile = () => {
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [editUsersProfile, { data, isLoading }] = useEditUsersProfileMutation();

  const onSubmit = async (data) => {
    try {
      const newData = {
        username: data.username,
        email: data.email,
        bio: "",
        image: data.image,
      };
      const token = JSON.parse(localStorage.getItem("token"));
      console.log(newData);
      await editUsersProfile({
        data: newData,
        token: token,
      }).unwrap();
    } finally {
      // reset();
    }
  };
  // console.log(isLoading);

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
            {...register("username", {
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
          {errors?.username && <p>{errors?.username?.message}</p>}
        </label>
        <label htmlFor="email">
          <div className={styles.inputTitle}>Email address</div>
          <input
            type="email"
            id="email"
            placeholder="Email address"
            className={styles.input}
            {...register("email", {
              required: "This field is required!",
              pattern: {
                value: /^[^\s()<>@,;:\/]+@\w[\w\.-]+\.[a-z]{2,}$/i,
                message: "Wrong email address format!",
              },
            })}
          />
          {errors?.email && <p>{errors?.email?.message}</p>}
        </label>
        <label htmlFor="password">
          <div className={styles.inputTitle}>New password</div>
          <input
            type="password"
            id="password"
            placeholder="New password"
            className={styles.input}
            {...register("password", {
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
          {errors?.password && <p>{errors?.password?.message}</p>}
        </label>
        <label htmlFor="avatarImage">
          <div className={styles.inputTitle}>Avatar image (url)</div>
          <input
            type="url"
            id="avatarImage"
            placeholder="Avatar image"
            className={styles.input}
            {...register("avatar", {
              required: "This field is required!",
            })}
          />
          {errors?.avatar && <p>{errors?.avatar?.message}</p>}
        </label>
        <input
          className={styles.button}
          type="submit"
          value="Save"
          disabled={!isValid}
          onClick={handleSubmit(onSubmit)}
        />
      </form>
    </Card>
  );
};
