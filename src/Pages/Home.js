import React , { useState , useEffect } from 'react';
import axios from 'axios'; 
import { Link } from 'react-router-dom'

import Img from '../Group 1.png';
import MovieCards from '../components/MovieCards';
import db from '../config/firebase'; 
import '../App.css'
const MoviesAPI = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8e226ac94d6cb225fcb0652695f029d7&page=1`

const SearchAPI = `https://api.themoviedb.org/3/search/movie?&api_key=8e226ac94d6cb225fcb0652695f029d7&query=`

const IMG_API = 'https://images.tmdb.org/t/p/w1280';


const Home = () => {
    const [ movies , setMovies ] = useState([]);
    const [ searchTerm , setSearchTerm ] = useState('');
    const [selectedMovies , setSelectedMovies] = useState([]);
    const [ repatedLiked , setRepatedLiked ] = useState(null); 

    const getMovies = (API) => {
        axios
            .get(API)
            .then((response) => {
                console.log(response.data.results);
                setMovies(response.data.results);
            })
    }

    useEffect(() => {
        getMovies(MoviesAPI);
        fetchMovieList();
    }, [])
    
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

    console.log(typeof selectedMovies);

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
                title : input.title,
                vote_average : input.vote_average,
                image_path : IMG_API + input.poster_path
            })
        }

    }


    return(
        <>
        <header> 
            <div>
                <Link to = '/' className = 'nav-link'>
                    <img src = {Img}  className = 'logo' alt = 'Logo ' />
                </Link>
                <Link to = '/' className = 'nav-link'>
                    Home    
                </Link>
                <Link to = '/fav' className = 'nav-link'>
                    Feavourites
                </Link>
            </div>
            <form onSubmit = {handleOnSubmit}>
            <input
            className = 'search'
            type = 'search'
            placeholder = 'Search...'
            value = {searchTerm}
            onChange = {handleSearchTerm}
            />
            </form>
        </header>
        <div className = 'movie-container'>      
            { movies && movies.map((movie) => <MovieCards key = {movie.id} {...movie} handleFavourite = {handleFavourite} />) }
        </div>
        {
            repatedLiked && (
                <div className = 'snackbar show'>
                    Already added in the favourites..
                </div>
            )
        }
        </>
    )
}

export default Home;