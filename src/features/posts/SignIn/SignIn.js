import React, { useEffect, useState } from "react";
import { Card, Spin } from "antd";
import styles from "../SignIn/SignIn.module.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginExistingUserMutation } from "../../users/usersSlice";

export const SignIn = () => {
  const [signInError, setSignInError] = useState(false);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [loginExistingUser, { data: user, isLoading }] =
    useLoginExistingUserMutation();

  const navigate = useNavigate();

  const onSignInSubmit = async (data) => {
    let userData;
    try {
      userData = { email: data.email, password: data.password };
      await loginExistingUser(userData).unwrap();
      window.localStorage.setItem("isLoggedIn", JSON.stringify(true));
      window.dispatchEvent(new Event("storage"));
      navigate("/articles");
      console.log(data);
    } catch (e) {
      setSignInError(true);
      setTimeout(() => setSignInError(false), 3000);
    } finally {
      reset();
    }
  };

  useEffect(() => {
    if (user) {
      window.localStorage.setItem("token", JSON.stringify(user.user.token));
      window.localStorage.setItem("user", JSON.stringify(user.user));
      window.dispatchEvent(new Event("user"));
    }
  }, [user]);

  return (
    <>
      {isLoading ? (
        <Spin fullscreen />
      ) : (
        <Card className={styles.box}>
          <div className={styles.title}>Sign In</div>
          <form onSubmit={handleSubmit(onSignInSubmit)}>
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
              <div className={styles.inputTitle}>New password</div>
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
            {signInError && <p>Your email or password is invalid!</p>}

            <input
              className={styles.button}
              type="submit"
              value="Login"
              disabled={!isValid}
              onClick={handleSubmit(onSignInSubmit)}
            />

            <div className={styles.signBox}>
              <span className={styles.accountText}>Don`t have an account?</span>
              <Link to="/createProfile" className={styles.signText}>
                Sing Up.
              </Link>
            </div>
          </form>
        </Card>
      )}
    </>
  );
};
