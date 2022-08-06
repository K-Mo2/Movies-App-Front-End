import React, { useEffect, useState, useContext, useCallback } from "react";
import styles from "./section.module.css";
import MovieCard from "./MovieCard";
import { appContext } from "../context/app-context";

export default function Section() {
  
  const url = "https://movies-app-back-end.herokuapp.com";

  const [dataState, setDataState] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);
  const [flag, setFlag] = useState(true);

  const { favoriteMoviesHandler } = useContext(appContext);

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

  const favoriteMoviesId = useCallback(
    async function favoriteMoviesId() {
     try {
      const response = await fetch(url + "/favorites");
      const data = await response.json();
      const ids = data?.map((movie) => {
        return movie?.id;
      });
      favoriteMoviesHandler?.(ids);
     } catch (error) {
      throw new Error({Error: error.message});
     }
    },
    [favoriteMoviesHandler]
  );

  useEffect(() => {
    if (flag) {
      fetchData();
      favoriteMoviesId();
    }
  }, [flag, favoriteMoviesId]);

  return (
    <div>
      <div className={styles.sectionHeader}>
        <h3 className={styles.sectionTitle}>The Latest Movies</h3>
      </div>
      <div>
        <ul className={styles.sectionContent}>
          { !error &&
            !isLoading &&
             dataState &&           
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
              return null;
            })}
        </ul>
      </div>
    </div>
  );
}
