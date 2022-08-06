import React, { useContext } from "react";
import styles from "./searchbar.module.css";
import { useNavigate } from "react-router-dom";
import { appContext } from "../context/app-context";

export default function SearchBar() {
  const navigate = useNavigate();

  const context = useContext(appContext);

  const submitHandler = function () {
    if (context.searchTerm) {
      navigate("search");
    }
  };

  return (
    <div className={styles.search}>
      <input
        type="text"
        placeholder="Enter a movie's name"
        className={styles.searchInput}
        onChange={(event) => {
          context.searchTermHandler(event.target.value);
        }}
      />
      <button onClick={submitHandler} className={styles.submitBtn}>
        <div className={styles.btnText} >Submit</div>
      </button>
    </div>
  );
}
