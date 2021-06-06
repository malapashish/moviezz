import React , { useState , useEffect } from 'react';

import { movieDbAPI } from '../apis';
import db from '../config/firebase'; 
import LikeMessages from '../components/LikeMessages';
import Cards from '../components/Cards'; 
import { useDebounce } from '../utilities/useDebounce';
import duckSearching from './duck_searching.gif';

require('dotenv').config(); 


const Movie = () => {

    const [ searchTerm , setSearchTerm ] = useState(''); 
    const [ isSearching , setIsSearching ] = useState(false);
    const [ movies , setMoviesList ] = useState([]);
    const [ favouriteContent , setFavouriteContent] = useState([]);
    const [ repeatedLiked , setRepeatedLiked ] = useState(null); 
    const [ message , setMessage ] = useState(null);

    const debouncedSearchTerm = useDebounce( searchTerm , 500 );

    useEffect(() => {
        if(debouncedSearchTerm){
            const getMovies = async (term) => {
                await movieDbAPI.get(`search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}`)
                                .then((response) => {
                                    setMoviesList(response.data.results); 
                                    setIsSearching(false);
                                })
            }
            getMovies(debouncedSearchTerm);
            setIsSearching(true);
            fetchMovieList();
        }else{
            setMoviesList([]);
        }
    },[debouncedSearchTerm])
 
    const IMG_API = 'https://images.tmdb.org/t/p/w1280';
     
     

    const handleSearchTerm = (e) => {
        setSearchTerm(e.target.value);
    }


    const handleFavourite = (input) => {  
        if(favouriteContent.some(movie => movie.title === input.title)){
            setRepeatedLiked(true); 
            setTimeout(() => {
                setRepeatedLiked(null);
            } , 500);
        }else{
            db
            .collection('favorites')
            .add({
                movieId : input.id,
                title : input.title || input.name,
                vote_average : input.vote_average,
                image_path : IMG_API + input.poster_path
            })
            setMessage('Added to the favorites');
            setTimeout(() => {
                setMessage(null);
            } , 500)
        }

    }


    const fetchMovieList = () => {
        db
            .collection('favorites')
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
            <div className = 'wrap'> 
                    <input
                    className = 'search'
                    type = 'text'
                    placeholder = 'Enter Movie name Here'
                    value = {searchTerm}
                    onChange = {handleSearchTerm}
                    /> 
            </div>
                {
                    isSearching &&
                     <div style = {{ textAlign : 'center' }} > 
                        <img src = {duckSearching} alt = 'Searching Gif' className = 'searching-gif' />
                        Searching.......
                     </div>
                }
                
            <div className = 'movie-container'>
                { movies && movies.map((movie) => <Cards key = {movie.id}  {...movie} media_type = 'movie' handleFavourite = {handleFavourite} />) }
            </div>
            <LikeMessages message = {message} />
            {
                repeatedLiked && (
                    <div className = 'snackbar show'>
                        Already added in the favourite..
                    </div>
                )
            }
        </>
    )
};

export default Movie;