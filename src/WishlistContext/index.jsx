import { createContext, useContext, useState, useEffect } from 'react';

export const WishlistContext = createContext();

export const useWishlist = () => useContext(WishlistContext);

const WishlistProvider = ({ children }) => {
  
  const [wishlistMovies, setWishlistMovies] = useState(() => {
  try {
    const stored = localStorage.getItem("wishlistMovies");
    console.log("Loaded from localStorage:", stored);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Error parsing wishlistMovies:", e);
    return [];
  }
});

  useEffect(() => {
    localStorage.setItem("wishlistMovies", JSON.stringify(wishlistMovies));
    
  }, [wishlistMovies]);

  const addToWishlist = (movie) => {
    const alreadyExists = wishlistMovies.find((item) => item.id === movie.id);
    if (!alreadyExists) {
      setWishlistMovies((prev) => [...prev, movie]);
    }
  };

  const isInWishlist = (movieId) => {
    return wishlistMovies.find((movie) => movie.id === movieId);
  };

  const clearWishlist = () => {
    setWishlistMovies([]);
    localStorage.removeItem("wishlistMovies");
  };

  const removeMovie = (movieId) => {
    
    setWishlistMovies((prev) => {
      const updatedWishlist = prev.filter((movie) => movie.id !== movieId);
      localStorage.setItem("wishlistMovies", JSON.stringify(updatedWishlist));
      return updatedWishlist;
    })
  }


  return (
    <WishlistContext.Provider value={{ wishlistMovies, addToWishlist, isInWishlist, clearWishlist,removeMovie}}>
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;