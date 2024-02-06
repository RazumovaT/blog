import React from "react";
import styles from "../LoggedInHeader/LoggedInHeader.module.scss";
import { Link, useNavigate } from "react-router-dom";

export const LoggedInHeader = () => {
  const navigate = useNavigate();
  const onLogOutSubmit = () => {
    window.localStorage.setItem("isLoggedIn", "false");
    window.dispatchEvent(new Event("storage"));
    navigate("/", { replace: true });
  };
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        Realworld Blog
      </Link>
      <div className={styles.buttons}>
        <Link to="/postForm">
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
    </header>
  );
};
