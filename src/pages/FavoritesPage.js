import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import style from "./favoritespage.module.css";
import MovieCard from "../components/MovieCard";
import styles from "./favoritespage.module.css";

const url = "https://movies-app-back-end.herokuapp.com";

export default function FavoritesPage() {
  const [favoritesState, setFavoritesState] = useState([]);
  const [isLoading, setIsloading] = useState(false);
  const [error, setError] = useState(false);

  const fetchMovies = async function () {
    
    try {
      setIsloading(true);
      const response = await fetch(url + "/favorites");
      const data = await response.json();

      setFavoritesState(data);
      setIsloading(false);
    
    } catch (error) {
        setError(true);
        throw new Error({ Error: error });
    }
  };

  useEffect(() => {
    fetchMovies();
  }, []);

  return (
    <div>
      <div>
        <Link to="/" >
          <div className={style.homeBtn}>
              <div className={style.btnText}>Home</div> 
          </div>
        </Link>
      </div>
      <header>
        <h1 className={style.headerTag}> Favorite Movies</h1>
      </header>
      <main>
        <section>
          <div>
            <ul className={styles.sectionContent}>
              { !error &&
                !isLoading &&
                 favoritesState &&
                 favoritesState?.map((movie) => {
                  return (
                    <li key={movie.id} className={styles.sectionItem}>
                      <MovieCard
                        id={movie.id}
                        title={movie.title}
                        image={movie.poster_path}
                      />
                    </li>
                  );
                })}
              {!favoritesState.length && (
                <h1>No Favorite Movies! Start adding some.</h1>
              )}
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
}
