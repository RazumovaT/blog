import React, { useState } from "react";
import { Card } from "antd";
import styles from "../SignIn/SignIn.module.scss";
import { useForm } from "react-hook-form";

export const SignIn = () => {
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
      <p className={styles.title}>Sign In</p>
      <form onSubmit={handleSubmit(onSubmit)}>
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
        <input
          className={styles.button}
          type="submit"
          value="Login"
          disabled={!isValid}
        />
        <div className={styles.signBox}>
          <p className={styles.accountText}>Don`t have an account?</p>
          <p className={styles.signText}>Sing Up.</p>
        </div>
      </form>
    </Card>
  );
};
