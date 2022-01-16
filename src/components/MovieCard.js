import React, { useState, useContext, useEffect } from "react";
import styles from "./moviecard.module.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { appContext } from "../context/app-context";

export default function MovieCard(props) {
  const imgURL = "https://image.tmdb.org/t/p/w500/";

  const serverURL = "https://movies-app-back-end.herokuapp.com";

  const [isFavorite, setIsFavortie] = useState();
  const [error, setError] = useState(false);

  const context = useContext(appContext);

  const addFavoriteHandler = async function () {
    try {
      const response = await fetch(serverURL + "/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({ id: props.id }),
      });
      if (!response.ok) {
        setError(true);
      }
    } catch (error) {
      throw new Error({ Error: error });
    }
  };

  const removeFavoriteHandler = async function () {
    try {
      const response = await fetch(serverURL + "/favorites", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: props.id }),
      });
      const data = await response.json();
    } catch (error) {
      throw new Error({ Error: error });
    }
  };

  useEffect(() => {
    setTimeout(() => {
      if (context.favoriteMovies.includes(props.id)) {
        setIsFavortie(true);
      }
    }, 0);
  }, [context.favoriteMovies, props.id]);

  return (
    <div className={styles.movieCard} id={props.id}>
      <img
        src={imgURL + props.image}
        alt="movieImage"
        className={styles.cardImage}
      />
      <p>{props.title}</p>
      <div className={styles.cardIcons}>
        <FontAwesomeIcon
          icon={faHeart}
          className={styles.likeIcon}
          style={
            isFavorite && {
              color: "red",
              transition: "1s ease",
            }
          }
          size="2x"
          onClick={() => {
            isFavorite ? removeFavoriteHandler() : addFavoriteHandler();
            setIsFavortie(!isFavorite);
          }}
        />
      </div>
      <p style={{ color: "red" }}>
        {error && "! This is already a favorite movie"}
      </p>
    </div>
  );
}
