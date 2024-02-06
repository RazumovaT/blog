import React from "react";
import styles from "../Header/Header.module.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.title}>
        Realworld Blog
      </Link>
      <div className={styles.buttons}>
        <Link to="/signIn" className={styles.signIn}>
          Sign In
        </Link>
        <Link to="/signUp">
          <button className={styles.signUp} type="button">
            Sign Up
          </button>
        </Link>
      </div>
    </header>
  );
};
