import React , { useState , useEffect } from 'react';
import axios from 'axios'; 
import { NavLink } from 'react-router-dom' 

import MovieCards from '../components/MovieCards';
import CustomPagination from '../components/Pagination';
import LikeMessages from '../components/LikeMessages';
import db from '../config/firebase'; 
import '../App.css'

// const MoviesAPI =  `https://api.themoviedb.org/3/trending/all/day?api_key=8e226ac94d6cb225fcb0652695f029d7&page=1   `

const SearchAPI = `https://api.themoviedb.org/3/search/movie?&api_key=8e226ac94d6cb225fcb0652695f029d7&query=`

const IMG_API = 'https://images.tmdb.org/t/p/w1280';


const Home = () => {
    const [ page, setPage ] = useState(1);
    const [ movies , setMovies ] = useState([]);
    const [ searchTerm , setSearchTerm ] = useState('');
    const [ selectedMovies , setSelectedMovies] = useState([]);
    const [ repatedLiked , setRepatedLiked ] = useState(null); 
    const [ message , setMessage ] = useState(null);

    // const MoviesAPI = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8e226ac94d6cb225fcb0652695f029d7&page=${page}`
    const MoviesAPI = `https://api.themoviedb.org/3/discover/movie?api_key=8e226ac94d6cb225fcb0652695f029d7&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}`
    const getMovies = (API) => {
        axios
            .get(API)
            .then((response) => { 
                setMovies(response.data.results); 
            })
    }

    useEffect(() => {
        getMovies(MoviesAPI);
        fetchMovieList();
        window.scroll(0, 0);
    }, [MoviesAPI])
    
    const fetchMovieList = () => {
        db
            .collection('favourites')
            .onSnapshot((q) => {
               setSelectedMovies(
                   q.docs.map((doc) => ({
                       id : doc.id ,
                       title : doc.data().title , 
                        poster_path : doc.data().image_path,
                       vote_average : doc.data().vote_average
                   }))
               )
           }) 
    }
 

    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(searchTerm){
        getMovies( SearchAPI + searchTerm )
        setSearchTerm('');   
        } 
    }

     

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }
  
    const handleFavourite = (input) => {  
        if(selectedMovies.some(movie => movie.title === input.title)){
            setRepatedLiked(true); 
            setTimeout(() => {
                setRepatedLiked(null);
            } , 500);
        }else{
            db
            .collection('favourites')
            .add({
                movieId : input.id,
                title : input.title,
                vote_average : input.vote_average,
                image_path : IMG_API + input.poster_path
            })
            setMessage('Added to the favourites');
            setTimeout(() => {
                setMessage(null);
            } , 500)
        }

    }
 
    return(
        <>
        <nav>   
            <>
                <NavLink exact to = '/' className = 'nav-link ' activeClassName = 'active'>
                    Home    
                </NavLink> 
                <NavLink to = '/fav' className = 'nav-link' activeClassName = 'active'>
                    Feavourites
                </NavLink> 
                <NavLink to = '/movies' className = 'nav-link' activeClassName = 'active'>
                    Movies
                </NavLink>
                <NavLink to = '/series' className = 'nav-link' activeClassName = 'active'>
                    Series
                </NavLink>
            </>
                <div className = 'search-container'>
                    <form onSubmit = {handleOnSubmit}>
                    <input
                    className = 'search'
                    type = 'text'
                    placeholder = 'Search...'
                    value = {searchTerm}
                    onChange = {handleSearchTerm}
                    />
                    </form>
                </div>
        </nav>

        <span className = 'page-heading'> 
        <i className="fas fa-fire"></i>   
            Trending
        </span>
        <div className = 'movie-container'>      
            { movies && movies.map((movie) => <MovieCards key = {movie.id} {...movie} handleFavourite = {handleFavourite} />) }
        </div>
        <LikeMessages message = {message} />
        {
            repatedLiked && (
                <div className = 'snackbar show'>
                    Already added in the favourites..
                </div>
            )
        }
        <CustomPagination  setPage = {setPage} />
        </>
    )
}

export default Home;