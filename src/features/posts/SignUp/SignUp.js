import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styles from "../SignUp/SignUp.module.scss";
import { Card, Divider, Spin } from "antd";
import { Link, useNavigate } from "react-router-dom";
import { useRegisterNewUserMutation } from "../../users/usersSlice";

export const SignUp = () => {
  const [usernameError, setUsernameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const navigate = useNavigate("");
  const [registerNewUser, { isLoading }] = useRegisterNewUserMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
    watch,
  } = useForm({
    mode: "onBlur",
  });

  const onSignUpSubmit = async (data) => {
    let newObj;
    try {
      newObj = {
        username: data.username,
        email: data.email,
        password: data.password,
      };
      const response = await registerNewUser(newObj).unwrap();
      window.localStorage.setItem("token", JSON.stringify(response.user.token));
      window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
      window.localStorage.setItem("user", JSON.stringify(response.user));
      window.dispatchEvent(new Event("storage"));
      window.dispatchEvent(new Event("user"));
      navigate("/");
    } catch (e) {
      if (e.data.errors.username) {
        setUsernameError(true);
        setTimeout(() => setUsernameError(false), 3000);
      } else if (e.data.errors.email) {
        setEmailError(true);
        setTimeout(() => setEmailError(false), 3000);
      }
    } finally {
      reset();
    }
  };

  return (
    <>
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <Card className={styles.box}>
          <div className={styles.title}>Create new account</div>
          <form onSubmit={handleSubmit(onSignUpSubmit)}>
            <label htmlFor="username">
              <div className={styles.inputTitle}>Username</div>
              <input
                type="text"
                id="username"
                className={errors?.username ? styles.errorInput : styles.input}
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
                className={errors?.email ? styles.errorInput : styles.input}
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
              <div className={styles.inputTitle}>Password</div>
              <input
                type="password"
                id="password"
                placeholder="Password"
                className={errors?.password ? styles.errorInput : styles.input}
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
            <label htmlFor="repeatPassword">
              <div className={styles.inputTitle}>Repeat password</div>
              <input
                type="password"
                id="repeatPassword"
                placeholder="Repeat password"
                className={
                  errors?.repeatPassword ? styles.errorInput : styles.input
                }
                {...register("repeatPassword", {
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
                  validate: (value) => {
                    if (watch("password") !== value) {
                      return "Your passwords don`t match!";
                    }
                  },
                })}
              />
              {errors?.repeatPassword && (
                <p>{errors?.repeatPassword?.message}</p>
              )}
            </label>
            <Divider className={styles.divider} />
            <div className={styles.checkboxContainer}>
              <input
                type="checkbox"
                {...register("checkbox", {
                  required:
                    "You should agree to the processing personal information",
                })}
              />
              <span className={styles.text}>
                I agree to the processing of my personal information
              </span>
            </div>
            {errors?.checkbox && <p>{errors?.checkbox?.message}</p>}
            {usernameError && <p>Username is already taken!</p>}
            {emailError && <p>Email is already taken!</p>}
            <input
              className={styles.button}
              type="submit"
              value="Create"
              disabled={!isValid}
              onClick={handleSubmit(onSignUpSubmit)}
            />
            <div className={styles.signBox}>
              <span className={styles.accountText}>
                Already have an account?
              </span>
              <Link to="/signIn" className={styles.signText}>
                Sing in.
              </Link>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};
