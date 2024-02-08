import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../EditProfile/EditProfile.module.scss";
import { Card, Spin } from "antd";
import { useEditUsersProfileMutation } from "../usersSlice";
import { useNavigate } from "react-router-dom";

export const EditProfile = ({ user: userData }) => {
  const token = JSON.parse(localStorage.getItem("token"));
  const [usernameError, setUsernameError] = useState(false);
  const navigate = useNavigate();

  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const [editUsersProfile, { data: user, isLoading }] =
    useEditUsersProfileMutation();

  const onEditSubmit = async (data) => {
    try {
      const newData = {
        username: data.username,
        email: data.email,
        bio: "",
        image: data.avatar,
      };
      await editUsersProfile({
        data: newData,
        token: token,
      }).unwrap();
      navigate("/articles");
    } catch (e) {
      if (e.status === 422) {
        setUsernameError(true);
        setTimeout(() => setUsernameError(false), 3000);
      }
    } finally {
      reset();
    }
  };

  useEffect(() => {
    if (user) {
      window.dispatchEvent(new Event("user"));
      window.localStorage.setItem("token", JSON.stringify(user.user.token));
      window.localStorage.setItem("user", JSON.stringify(user.user));
    }
  }, [user]);

  console.log(user);

  return (
    <>
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <Card className={styles.box}>
          <div className={styles.title}>Edit profile</div>
          <form onSubmit={handleSubmit(onEditSubmit)}>
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
                    message:
                      "Your username needs to be less than 20 characters.",
                  },
                  validate: () => {
                    if (watch("username") === userData?.username) {
                      return "Please, choose another username!";
                    }
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
                  validate: () => {
                    if (watch("email") !== userData?.email) {
                      return "Your email is invalid!";
                    }
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
                    message:
                      "Your password needs to be less than 20 characters.",
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
            {usernameError && <p>Username is already taken!</p>}
            <input
              className={styles.button}
              type="submit"
              value="Save"
              disabled={!isValid}
              onClick={handleSubmit(onEditSubmit)}
            />
          </form>
        </Card>
      )}
    </>
  );
};
