import './index.css'
import { Link } from 'react-router'
import { FiSearch } from 'react-icons/fi'
import { TailSpin } from 'react-loader-spinner';
import Cookies from 'js-cookie';

import {useState,useEffect} from 'react'
const Search = () => {
    const [isLoading,setIsLoading] = useState(true);
    const[searchInput,setSearchInput] = useState('');
    const[searchMovies,setSearchMovies] = useState([]);
    


    useEffect(()=>{
        
        const fetchSearchMovies = async () => {
            const searchmoviesUrl=`https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`
            const jwtToken = Cookies.get('jwt_token');
            const options = {
                headers: {
                    Authorization: `Bearer ${jwtToken}`
                },
                method: 'GET',
            }
            const response = await fetch(searchmoviesUrl,options);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                
                const formattedData = data.results.map(each => ({
                    backdropPath: each.backdrop_path,
                    id: each.id,
                    overview: each.overview,
                    posterPath: each.poster_path,
                    title: each.title,
                }))

                setSearchMovies(formattedData);
                
            } else {
                console.error('Failed to fetch search results');
            }
            setIsLoading(false);
        }
        
    fetchSearchMovies();

    },[])

    const onClickSearch = (event) =>{
        setSearchInput(event.target.value);
    }

    const filteredMoviesList = searchMovies.filter(eachMovie => 
        eachMovie.title.toLowerCase().includes(searchInput.toLowerCase())
    );
    return (
        <>
            <div className="search-container">
                <div className="search-card1">
                    <Link to="/">
                        <h1 className="search-h1">MOVIES</h1>
                    </Link>

                    <Link to="/">
                        <p className="search-p1">Home</p>
                    </Link>
                    <Link to="/popular">
                        <p className="search-p1">Popular</p>
                    </Link>
                </div>
                <div className="search-card1">
                    <div className="search-page-input-container" >
                    <input type="text" className="search-page-input" placeholder="Search" value={searchInput} onChange={onClickSearch}/>
                    
                    <FiSearch className="search-search-icon" color="white"/>
                    </div>
                    <Link to="/wishlist">
                        <p className="search-p1" >Wishlist</p>
                    </Link>
                    <Link to="/account"><img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751225515/Avatar_vowef8.png" alt='header-logo' className="search-man-logo"/></Link>
                </div>
            </div>
            {isLoading ? (
                <div className="search-loader-container" testid="loader">
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
                {(searchInput !== ' ' && filteredMoviesList.length === 0) ? (
                    <div className="search-no-results-container">
                        <img src="https://res.cloudinary.com/dgd7f5oj9/image/upload/v1751501604/Group_7394_qtocg4.png" alt="no results" className="search-no-results-image" />
                        <h1 className="search-no-results-heading">Your search for {searchInput} did not find any matches.</h1>
                    </div>
                ) : null}
                <div className="search-container2">
                    {filteredMoviesList.map(eachMovie => (
                        <Link to={`/movieitemdetails/${eachMovie.id}`} key={eachMovie.id}>
                            <div className="search-movies-card">
                                <img
                                src={eachMovie.posterPath}
                                alt={eachMovie.title}
                                className="search-each-img"
                            />
                            </div>
                        </Link>
                    ))}
                </div>
                
                </>
            )
            }
        </>
    );
}
export default Search;