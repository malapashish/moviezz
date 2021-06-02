import React , { useState } from 'react';
import axios from 'axios';
import { NavLink } from 'react-router-dom';
import db from '../config/firebase'; 
import LikeMessages from '../components/LikeMessages';
import Cards from '../components/Cards';

const Movie = () => {


    const [ searchTerm , setSearchTerm ] = useState(''); 
    const [ movies , setMoviesList ] = useState([]);
    const [ favouriteContent , setFavouriteContent] = useState([]);
    const [ repatedLiked , setRepatedLiked ] = useState(null); 
    const [ message , setMessage ] = useState(null);

    // https://api.themoviedb.org/3/search/movie?&api_key=8e226ac94d6cb225fcb0652695f029d7&query=
    const IMG_API = 'https://images.tmdb.org/t/p/w1280';
    const SearchAPI = `https://api.themoviedb.org/3/search/movie?api_key=8e226ac94d6cb225fcb0652695f029d7&language=en-US&query=`
    const getMovies = (API) => {
        axios
            .get(API)
            .then((response) => { 
                setMoviesList(response.data.results); 
            })
    }
    const handleOnSubmit = (e) => {
        e.preventDefault();
        if(searchTerm){
        getMovies( SearchAPI + searchTerm )
        setSearchTerm('');   
        fetchMovieList();
        } 
    }

     

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }


    const handleFavourite = (input) => {  
        if(favouriteContent.some(movie => movie.title === input.title)){
            setRepatedLiked(true); 
            setTimeout(() => {
                setRepatedLiked(null);
            } , 500);
        }else{
            db
            .collection('favourites')
            .add({
                movieId : input.id,
                title : input.title || input.name,
                vote_average : input.vote_average,
                image_path : IMG_API + input.poster_path
            })
            setMessage('Added to the favourites');
            setTimeout(() => {
                setMessage(null);
            } , 500)
        }

    }


    const fetchMovieList = () => {
        db
            .collection('favourites')
            .onSnapshot((q) => {
               setFavouriteContent(
                   q.docs.map((doc) => ({
                       id : doc.id ,
                       title : doc.data().title , 
                        poster_path : doc.data().image_path,
                       vote_average : doc.data().vote_average
                   }))
               )
           }) 
    }

    return(
        <>
            <nav>   
                <NavLink exact to = '/' className = 'nav-link' activeClassName = 'active'>
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
            </nav>
            <div className = 'wrap'>
                <form onSubmit = {handleOnSubmit}>
                    <input
                    className = 'search'
                    type = 'text'
                    placeholder = 'Enter Movie name Here'
                    value = {searchTerm}
                    onChange = {handleSearchTerm}
                    />
                    </form>
            </div>
            <div className = 'movie-container'>
                { movies && movies.map((movie) => <Cards key = {movie.id}  {...movie} media_type = 'movie' handleFavourite = {handleFavourite} />) }
            </div>
            <LikeMessages message = {message} />
            {
                repatedLiked && (
                    <div className = 'snackbar show'>
                        Already added in the favourites..
                    </div>
                )
            }
        </>
    )
};

export default Movie;