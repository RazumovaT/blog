import React from "react";
import styles from "../Header/Header.module.scss";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.link}>
        Realword Blog
      </Link>
      <div className={styles.buttons}>
        <Link to="/signIn" className={styles.link}>
          Sign In
        </Link>
        <Link to="/createProfile" type="button">
          Sign Up
        </Link>
      </div>
    </header>
  );
};
