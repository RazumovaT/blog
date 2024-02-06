import React from "react";
import styles from "../Layout/Layout.module.scss";
import { Link, useNavigate, Outlet } from "react-router-dom";
import { PostList } from "../../features/posts/PostList/PostList";

export const Layout = ({ logged }) => {
  const navigate = useNavigate();
  const onLogOutSubmit = () => {
    window.localStorage.setItem("isLoggedIn", "false");
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
              John Weedy
            </Link>
            <Link to="/profile">
              {
                <img
                  src="https://cdn-icons-png.flaticon.com/512/5556/5556499.png"
                  className={styles.avatar}
                />
              }{" "}
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
