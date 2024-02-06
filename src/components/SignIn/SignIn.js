import React, { useEffect, useState } from "react";
import { Card } from "antd";
import styles from "../SignIn/SignIn.module.scss";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useLoginExistingUserMutation } from "../../features/users/usersSlice";

export const SignIn = () => {
  const [isSignedUp, setIsSignedUp] = useState(true);
  const {
    register,
    formState: { errors, isValid },
    handleSubmit,
    reset,
  } = useForm({
    mode: "onBlur",
  });

  const [loginExistingUser, { data: user }] = useLoginExistingUserMutation();

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
    } catch {
      setIsSignedUp(false);
      window.localStorage.removeItem("isLoggedIn");
    } finally {
      reset();
    }
  };
  useEffect(() => {
    if (user) {
      window.localStorage.setItem("token", JSON.stringify(user.user.token));
    }
  }, [user]);

  return (
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
                message: "Your password needs to be less than 20 characters.",
              },
            })}
          />
          {errors?.password && <p>{errors?.password?.message}</p>}
        </label>
        {!isSignedUp && <p>You don`t have an account yet, please sign up!</p>}

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
  );
};
