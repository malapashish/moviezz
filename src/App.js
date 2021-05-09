import React , { useEffect , useState } from 'react';
import axios from 'axios';


import './App.css';
import Movie from './components/Movie';

const MoviesAPI = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=8e226ac94d6cb225fcb0652695f029d7&page=1`

const SearchAPI = `https://api.themoviedb.org/3/search/movie?&api_key=8e226ac94d6cb225fcb0652695f029d7&query=`

const App = () => {

    const [ movies , setMovies ] = useState([]);
    const [ searchTerm , setSearchTerm ] = useState('');

    const getMovies = (API) => {
        axios
            .get(API)
            .then((response) => {
                setMovies(response.data.results);
            })
    }

    useEffect(() => {
        getMovies(MoviesAPI)
    }, [])


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

    return(
        <>
        <header>
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
            { movies && movies.map((movie) => <Movie key = {movie.id} {...movie} />) }
        </div>
        </>
    )
}

export default App