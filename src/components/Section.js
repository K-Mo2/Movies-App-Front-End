import React, { useEffect, useState, useContext } from "react";
import styles from "./section.module.css";
import MovieCard from "./MovieCard";
import { appContext } from "../context/app-context";

export default function Section() {
  const url = "https://movies-app-back-end.herokuapp.com";

  const [dataState, setDataState] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState(true);

  const context = useContext(appContext);

  useEffect(() => {
    if (flag) {
      fetchData();
      favoriteMoviesId();
    }
  }, [flag]);

  const fetchData = async function () {
    try {
      setIsloading(true);
      const response = await fetch(url);
      const data = await response.json();
      setDataState(data.results);

      setIsloading(false);
      setFlag(false);
    } catch (error) {
      setError(true);
      new Error(error);
    }
  };

  const favoriteMoviesId = async function () {
    const response = await fetch(url + "/favorites");
    const data = await response.json();
    const ids = data.map((movie) => {
      return movie.id;
    });
    context.favoriteMoviesHandler(ids);
  };

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>The last 10 movies</h3>
      </div>
      <div>
        <ul className={styles.sectionContent}>
          {!error &&
            !isLoading &&
            dataState.map((el) => {
              if (dataState.indexOf(el) < 10) {
                return (
                  <li className={styles.sectionItem} key={el.id}>
                    {" "}
                    <MovieCard
                      id={el.id}
                      title={el.title}
                      image={el.poster_path}
                      key={el.id}
                    />
                  </li>
                );
              }
            })}
        </ul>
      </div>
    </div>
  );
}
