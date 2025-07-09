import './index.css'
import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { useNavigate,Link } from 'react-router';
import Cookies from 'js-cookie'
import { FaGoogle, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Header from '../Header'
import { TailSpin } from 'react-loader-spinner';

const NextArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow next-arrow" onClick={onClick}>
            ❯
        </div>
    );
};

const PrevArrow = (props) => {
    const { onClick } = props;
    return (
        <div className="custom-arrow prev-arrow" onClick={onClick}>
            ❮
        </div>
    );
};

const Home = () => {
    const [originalsList, setOriginalsList] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    
    const [moviesList, setMoviesList] = useState([]);

    const getOriginalsList = async () => {
        

        const originalsUrl = "https://apis.ccbp.in/movies-app/originals";
        const jwtToken = Cookies.get('jwt_token');
        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method: 'GET',
        }

        const response = await fetch(originalsUrl, options);
        if (response.ok) {
            const data = await response.json();
            const formattedData = data.results.map(each => ({
                backdropPath: each.backdrop_path,
                id: each.id,
                overview: each.overview,
                posterPath: each.poster_path,
                title: each.title,
            }))
            setOriginalsList(formattedData);
        }

    }
    

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1,
        autoplay: false,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
  ],
    };



    const getMoviesList = async () => {
        const homeMoviesUrl = "https://apis.ccbp.in/movies-app/trending-movies";
        const jwtToken = Cookies.get('jwt_token');

        const options = {
            headers: {
                Authorization: `Bearer ${jwtToken}`
            },
            method: 'GET',
        }

        const response = await fetch(homeMoviesUrl, options);
        if (response.ok) {
            const data = await response.json();
            const formattedData = data.results.map(each => ({
                backdropPath: each.backdrop_path,
                id: each.id,
                overview: each.overview,
                posterPath: each.poster_path,
                title: each.title,
            }))
            setMoviesList(formattedData);
        }
        setIsLoading(false);
    }

    useEffect(() => {
        getMoviesList();
        getOriginalsList();

    }, [])

    return (
        <>
            {isLoading ? (
                <div className="loader-container" testid="loader">
                    <TailSpin
                        height="50"
                        width="50"
                        color="#D81F26"
                        ariaLabel="loading"
                        radius="1"
                        visible={true}
                    />

                </div>

            ) :
                <div className="home-page-container">
                    <div className="home-page-image">
                        <Header />
                        <h1 className="home-page-h1">Super Man</h1>
                        <p className="home-page-p1">Superman is a fictional superhero who first appeared in American comic books published by DC Comics.</p>
                        <Link to="/playtrailer"><button className="home-page-btn" style={{display:'flex',justifyContent:'center',alignItems:'center',gap:'5px'}}><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751609983/Screenshot_2025-07-04_114930_amzlel.png"
                        style={{width:'25px',height:'20px'}}/>Play</button></Link>

                        <div className="home-page-shadow" />

                    </div>

                    <h1 className="home-page-trending">Trending Now</h1>

                    <Slider {...settings} className="home-slider">
                        {moviesList.map(movie => (
                            <Link to={`/movieitemdetails/${movie.id}`} style={{ textDecoration: 'none' }}>
                                <div key={movie.id} className="slider-movie-item" onMouseEnter={() => setIsHovered(movie.id)}
                                    onMouseLeave={() => setIsHovered(null)}>
                                    <img
                                        src={movie.posterPath}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                </div>
                                
                            </Link>
                        ))}
                    </Slider>
                    <h1 className="home-page-trending">Originals</h1>
                    <Slider {...settings} className="home-slider">
                        {originalsList.map(movie => (
                            <Link to={`/movieitemdetails/${movie.id}`} style={{ textDecoration: 'none' }}>
                                <div key={movie.id} className="slider-movie-item">
                                    <img
                                        src={movie.posterPath}
                                        alt={movie.title}
                                        className="movie-poster"
                                    />
                                </div>
                                
                            </Link>
                        ))}
                    </Slider>
                    <div className="home-section-icon-card">
                        <FaGoogle color="white" className="home-icons-margin" />
                        <FaTwitter color="white" className="home-icons-margin"/>
                        <FaInstagram  color="white" className="home-icons-margin" />
                        <FaYoutube color="white" className="home-icons-margin" />
                    </div>
                    <div className="marginhome">
                        <p className="home-page-p3">Contact Us</p>
                    </div>
                </div>}

        </>
    )
}

export default Home;
