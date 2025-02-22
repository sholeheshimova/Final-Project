import React, { createContext, useState } from "react";

export const FavoritesContext = createContext();
const FavoritesProvider = ({ children }) => {
  const [film, setFilm] = useState([]);

  const toggleFavorites = async (fav) => {
    const idx = film.findIndex((q) => q._id === fav._id);
    if (idx === -1) {
      setFilm([...film, fav]);
    } else {
      setFilm([...film].filter((q) => q._id !== fav._id));
    }
  };
  return (
    <FavoritesContext.Provider value={{ film, toggleFavorites }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export default FavoritesProvider;
