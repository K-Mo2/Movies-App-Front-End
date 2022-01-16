import React, { useContext, useEffect, useState, useCallback } from "react";
import { appContext } from "../context/app-context";
import MovieCard from "../components/MovieCard";
import styles from "../components/section.module.css";
import { Link } from "react-router-dom";
import style from "./searchpage.module.css";

export default function SearchPage() {
  const [dataState, setDataState] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const context = useContext(appContext);

  const searchQuery = context.searchTerm;

  const url = "https://movies-app-back-end.herokuapp.com";

  const searchMovie = useCallback(
    async function searchMovie() {
      setIsloading(true);
      try {
        const response = await fetch(url + "/search", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            searchQuery: searchQuery,
          }),
        });

        const data = await response.json();
        setDataState(data.results);
      } catch (error) {
        setError(true);
        new Error(error);
      }
      setIsloading(false);
    },
    [searchQuery]
  );

  useEffect(() => {
    searchMovie();
  }, [searchMovie]);

  return (
    <div>
      <header>
        <h1 className={style.headerTag}>{searchQuery} Movies</h1>
      </header>
      <div>
        <Link to="/" className={style.homeBtn}>
          Home
        </Link>
      </div>{" "}
      <ul className={style.sectionContent}>
        {!error &&
          !isLoading &&
          dataState.map((el) => {
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
          })}
      </ul>
    </div>
  );
}
