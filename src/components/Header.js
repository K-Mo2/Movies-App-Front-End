import React from "react";
import styles from "./header.module.css";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <div className={styles.topbar}>
      <h1 className={styles.title}>Top Movies</h1>

      <div
        className={styles.favorites}
        onClick={() => {
          navigate("favorites");
        }}
      >
        <div>Favorites</div>
      </div>
    </div>
  );
}
