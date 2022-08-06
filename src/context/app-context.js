import React, { useState } from "react";

export const appContext = React.createContext({
  searchTerm: "",
  searchTermHandler: () => {},
  favoriteMoviesHandler: () => {},
  favoriteMovies: [],
});

const AppContextProvider = function (props) {
  const [searchTerm, setSearchTerm] = useState();
  const [favoriteMovies, setFavoriteMovies] = useState();

  const searchTermHandler = function (term) {
    setSearchTerm(term);
  };

  const favoriteMoviesHandler = function (favorites) {
    setFavoriteMovies(favorites);
  };
  
  return (
    <appContext.Provider
      value={{
        searchTerm: searchTerm,
        searchTermHandler: searchTermHandler,
        favoriteMoviesHandler: favoriteMoviesHandler,
        favoriteMovies: favoriteMovies,
      }}
    >
      {props.children}
    </appContext.Provider>
  );
};

export default AppContextProvider;
