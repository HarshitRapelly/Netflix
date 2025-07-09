import './index.css';
import { useContext, useState, useEffect } from 'react';
import { WishlistContext } from '../WishlistContext';
import { Link } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import { TailSpin } from 'react-loader-spinner';

const Wishlist = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { wishlistMovies, removeMovie } = useContext(WishlistContext);
  console.log("Rendering Wishlist. Movies count:", wishlistMovies.length);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  if (wishlistMovies.length === 0) {
    return (
      <>
        <div className="wishlist-container1">
        
          <div className="wishlist-card1">
            <Link to="/">
              <h1 className="wishlist-h1">MOVIES</h1>
            </Link>

            <Link to="/">
              <p className="wishlist-p1">Home</p>
            </Link>
            <Link to="/popular">
              <p className="wishlist-p1">Popular</p>
            </Link>
          </div>
          <div className="wishlist-card1">
            <Link to="/search"><FiSearch color="white" className="wishlist-search-icon" /></Link>
            <Link to="/wishlist">
              <p className="wishlist-p1" style={{ marginLeft: '3px', fontWeight: '500' }}>Wishlist</p>
            </Link>
            <Link to="/account"><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo' className="wishlist-man-logo" /></Link>
          </div>
        
      </div>
        {isLoading ? (
          <div className="wishlist-loader-container" testid="loader">
            <TailSpin
              height="50"
              width="50"
              color="#D81F26"
              ariaLabel="loading"
              radius="1"
              visible={true}
            />
          </div>
        ) : (
          <>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '88vh', color: 'white', backgroundColor: '#131313' }}>
              <h1 className="wishlist-no-items">Your Wishlist is Empty</h1>
            </div>
          </>
        )}
      </>
    );
  }

  return (
    <>
      <div className="wishlist-container1">
        
          <div className="wishlist-card1">
            <Link to="/">
              <h1 className="wishlist-h1">MOVIES</h1>
            </Link>

            <Link to="/">
              <p className="wishlist-p1">Home</p>
            </Link>
            <Link to="/popular">
              <p className="wishlist-p1">Popular</p>
            </Link>
          </div>
          <div className="wishlist-card1">
            <Link to="/search"><FiSearch color="white" className="wishlist-search-icon" /></Link>
            <Link to="/wishlist">
              <p className="wishlist-p1" style={{ marginLeft: '3px', fontWeight: '500' }}>Wishlist</p>
            </Link>
            <Link to="/account"><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo' className="wishlist-man-logo" /></Link>
          </div>
        
      </div>
      {isLoading ? (
        <div className="wishlist-loader-container" testid="loader">
          <TailSpin
            height="50"
            width="50"
            color="#D81F26"
            ariaLabel="loading"
            radius="1"
            visible={true}
          />
        </div>
      ) : (
        <>
          <div className="wishlist-container">
            <div style={{ display: 'flex',alignItems:'center' }}>
              <h1 className="wishlist-h2">My Wishlist</h1>
              <div className="wishlist-box">
                <p className="wishlist-box-item">{wishlistMovies.length}</p>
              </div>
            </div>

            <ul className="wishlist-items">
              {wishlistMovies.map((movie) => (
                <li key={movie.id} className="wishlist-item">
                  <Link to={`/movieitemdetails/${movie.id}`}><img className="wishlist-movie-img" src={movie.posterPath} alt={movie.title} /></Link>
                  <div className="wishlist-item-details">
                    <div>
                      <h1 className="wishlist-movie-h1">{movie.title}</h1>
                      <p className="wishlist-movie-p1">{movie.overview}</p>
                    </div>
                    <div>
                      <button onClick={() => removeMovie(movie.id)} className="wishlist-del-btn" >
                        <img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751746665/icons8-delete-button-128_dhco7o.png" alt="remove" className="wishlist-del-item" />
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}

    </>
  );
};

export default Wishlist;