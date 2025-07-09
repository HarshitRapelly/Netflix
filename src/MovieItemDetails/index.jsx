import './index.css';
import { useParams, Link } from 'react-router';
import { useContext, useEffect, useState } from 'react';
import Header from '../Header';
import Cookies from 'js-cookie';
import { TailSpin } from 'react-loader-spinner';
import { FaGoogle, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import {WishlistContext} from '../WishlistContext';

const MovieItemDetails = () => {
    const [isLoading, setIsLoading] = useState(true);
    const [movieDetails, setMovieDetails] = useState({});
    const { addToWishlist, isInWishlist } = useContext(WishlistContext);

    const { id } = useParams();

    const onClickedMovie = () => {
        if(!isInWishlist(movieDetails.id)) {
            const newMovie = {
                id: movieDetails.id,
                title: movieDetails.title,
                posterPath: movieDetails.posterPath,
                backdropPath: movieDetails.backdropPath,
                overview: movieDetails.overview,
                releaseDate: movieDetails.releaseDate,
                voteAverage: movieDetails.voteAverage,
                voteCount: movieDetails.voteCount,
            };
            addToWishlist(newMovie);
    }
    alert(`${movieDetails.title} movie added to wishlist successfully!`);
    };
    useEffect(() => {
        window.scrollTo(0, 0);
        setIsLoading(true);
        const fetchMovieItemDetails = async () => {
            const jwtToken = Cookies.get('jwt_token');
            const movieItemDetailsUrl = `https://apis.ccbp.in/movies-app/movies/${id}`;

            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                },
                method: 'GET',
            };

            const response = await fetch(movieItemDetailsUrl, options);
            if (response.ok) {
                const data = await response.json();

                const movie = data.movie_details;


                const formattedData = {
                    adult: movie.adult,
                    backdropPath: movie.backdrop_path,
                    budget: movie.budget,
                    genres: movie.genres.map((genre) => ({
                        id: genre.id,
                        name: genre.name,
                    })),
                    id: movie.id,
                    overview: movie.overview,
                    posterPath: movie.poster_path,
                    releaseDate: movie.release_date,
                    runtime: movie.runtime,
                    similarMovies: movie.similar_movies.map((movie) => ({
                        backdropPath: movie.backdrop_path,
                        id: movie.id,
                        overview: movie.overview,
                        posterPath: movie.poster_path,
                        title: movie.title,
                    })),
                    spokenLanguages: movie.spoken_languages.map((language) => ({
                        englishName: language.english_name,
                        id: language.id,
                    })),
                    title: movie.title,
                    voteAverage: movie.vote_average,
                    voteCount: movie.vote_count,
                };

                setMovieDetails(formattedData);

            } else {
                console.error('Failed to fetch movie details');
            }
            setIsLoading(false);
        };

        fetchMovieItemDetails();
    }, [id]);

    const formatRuntime = () => {
        const runtime = movieDetails.runtime || 0;
        const hours = Math.floor(runtime / 60);
        const minutes = runtime % 60;
        return `${hours}h ${minutes}m`;
    }

    const adultContent = movieDetails.adult ? 'A' : 'U/A';
    const releaseYear = movieDetails.releaseDate ? movieDetails.releaseDate.split('-')[0] : '';

    return (
        <>
            {isLoading ? (
                <div style={{ display: 'flex', backgroundColor: '#131313', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
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
                <div className="movie-item-details-main-container">
                    {movieDetails && (
                        <>
                            <div
                                className="movie-item-details-container"
                                style={{
                                    backgroundImage: `url(${movieDetails.posterPath})`,
                                    backgroundSize: 'cover',
                                    backgroundPosition: 'center'
                                }}
                            >
                                <Header />
                                <h1 className="movie-item-h1">{movieDetails.title}</h1>
                                <div style={{ display: 'flex', marginBottom: '10px' }}>
                                    <p className="movie-item-p2">{formatRuntime()}</p>
                                    <p className="movie-item-box">{adultContent}</p>
                                    <p className="movie-item-p3">{releaseYear}</p>
                                </div>
                                <p
                                    className={`movie-item-overview ${movieDetails.overview && movieDetails.overview.length > 30 ? 'long' : 'short'}`}
                                >
                                    {movieDetails.overview}
                                </p>
                                <div className="movie-item-div1">
                                    <Link to={`/youtubevideo/${movieDetails.id}`}><button
                                        className="movie-item-btn"
                                    ><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751609983/Screenshot_2025-07-04_114930_amzlel.png"
                                        className="movie-item-icon-style" />
                                        Play
                                    </button>
                                    </Link>
                                    <button onClick={onClickedMovie} className="plus-btn">+</button>
                                </div>
                                <div className="movie-item-details-shadow" />
                            </div>
                        </>
                    )
                    }
                    <div className="movie-item-div2">


                        <div className="movie-item-div3">
                            <h1 className="movie-item-h2">Genres</h1>
                            {movieDetails.genres && movieDetails.genres.length > 0 && movieDetails.genres.map((genre) => (
                                <p key={genre.id} className="movie-item-genre-name">{genre.name}</p>
                            ))}
                        </div>

                        <div className="movie-item-div3">
                            <h1  className="movie-item-h2">Audio Available</h1>
                            {movieDetails.spokenLanguages && movieDetails.spokenLanguages.length > 0 && movieDetails.spokenLanguages.map((language) => (
                                <p key={language.id} className="movie-item-genre-name">{language.englishName}</p>
                            ))}
                        </div>

                        <div className="movie-item-div3">
                            <h1  className="movie-item-h2">Rating Count</h1>
                            <p className="movie-item-genre-name">{movieDetails.voteCount}</p>
                            <h1 className="movie-item-h2">Rating Average</h1>
                            <p className="movie-item-genre-name">{movieDetails.voteAverage}</p>
                        </div>

                        <div className="movie-item-div3">
                            <h1  className="movie-item-h2">Budget</h1>
                            <p className="movie-item-genre-name">${movieDetails.budget}</p>
                            <h1 className="movie-item-h2">Release Date</h1>
                            <p className="movie-item-p4">{movieDetails.releaseDate}</p>
                        </div>

                    </div>
                    <h1 className="movie-item-h3">More like this</h1>
                    <div className="movie-item-div4 ">
                        {movieDetails.similarMovies && movieDetails.similarMovies.map((each) => (
                            <Link to={`/movieitemdetails/${each.id}`} key={each.id}>
                                <img src={each.backdropPath} alt={each.title} className="movie-item-each-img" />
                            </Link>
                        ))}
                    </div>
                    <div style={{ paddingBottom: '10px' }}></div>
                    <div className="each-movie-section-icon-card">
                        <FaGoogle color="white" className="movie-item-icon-margin" />
                        <FaTwitter color="white" className="movie-item-icon-margin"  />
                        <FaInstagram color="white" className="movie-item-icon-margin"  />
                        <FaYoutube color="white" className="movie-item-icon-margin" />
                    </div>
                    <div className="each-movie-last-card">
                        <p className="each-movie-page-p1">Contact Us</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default MovieItemDetails;
