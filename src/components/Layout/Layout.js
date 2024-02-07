import React from "react";
import styles from "../Layout/Layout.module.scss";
import { Link, useNavigate, Outlet } from "react-router-dom";

export const Layout = ({ logged, user }) => {
  const navigate = useNavigate();

  const onLogOutSubmit = () => {
    window.localStorage.setItem("isLoggedIn", "false");
    window.localStorage.removeItem("user");
    window.localStorage.removeItem("token");

    window.dispatchEvent(new Event("storage"));
    navigate("/", { replace: true });
  };

  return (
    <div className={styles.wrapper}>
      <header className={styles.header}>
        <Link to="/articles" className={styles.title}>
          Realworld Blog
        </Link>
        {logged ? (
          <div className={styles.buttons}>
            <Link to="/new-article">
              <button className={styles.createButton} type="button">
                Create article
              </button>
            </Link>
            <Link to="/profile" className={styles.name}>
              {user?.username}
            </Link>
            <Link to="/profile">
              {
                <img
                  src={
                    user?.image ||
                    "https://t4.ftcdn.net/jpg/02/15/84/43/360_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg"
                  }
                  className={styles.avatar}
                  alt="avatar"
                />
              }
            </Link>
            <button
              className={styles.logoutButton}
              type="button"
              onClick={onLogOutSubmit}
            >
              Log out
            </button>
          </div>
        ) : (
          <div className={styles.links}>
            <Link to="/signIn" className={styles.signIn}>
              Sign In
            </Link>
            <Link to="/signUp">
              <button className={styles.signUp} type="button">
                Sign Up
              </button>
            </Link>
          </div>
        )}
      </header>
      <Outlet />
    </div>
  );
};
