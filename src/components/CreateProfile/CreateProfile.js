import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../CreateProfile/CreateProfile.module.scss";
import { Card, Divider, Checkbox } from "antd";

export const CreateProfile = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
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
      <p className={styles.title}>Create new account</p>
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
            placeholder="Password"
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
        <label htmlFor="repeatPassword">
          <div className={styles.inputTitle}>New password</div>
          <input
            type="password"
            id="repeatPassword"
            placeholder="Repeat password"
            className={styles.input}
            {...register("repeatPassword", {
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
          {errors?.repeatPassword && <p>{errors?.repeatPassword?.message}</p>}
        </label>
        <Divider className={styles.divider} />
        <div className={styles.checkboxContainer}>
          <Checkbox />
          <span className={styles.text}>
            I agree to the processing of my personal information
          </span>
        </div>
        <input
          className={styles.button}
          type="submit"
          value="Create"
          disabled={!isValid}
        />
        <div className={styles.signBox}>
          <p className={styles.accountText}>Already have an account?</p>
          <p className={styles.signText}>Sing in.</p>
        </div>
      </form>
    </Card>
  );
};
