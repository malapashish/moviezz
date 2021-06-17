import React , {useState , useEffect} from 'react';
 
import '../App.css';
import FavoritesCards from '../components/FavouritesCard'
import { deleteFavourite } from '../utilities/deleteFavourite';

import db from '../config/firebase';
const Favorites = () => {
    
    const [ selectedMovies , setSelectedMovies ] = useState([]);

    
    const fetchMovieList = () => {
        db
            .collection('favorites')
            .onSnapshot((q) => {
               setSelectedMovies(
                   q.docs.map((doc) => ({
                        id : doc.id ,
                        title : doc.data().title , 
                        poster_path : doc.data().image_path,
                        vote_average : doc.data().vote_average,
                        movieId : doc.data().movieId,
                        media_type : doc.data().media_type
                   }))
               )
           }) 
    }
 

    useEffect(() => {
        fetchMovieList();
    },[])

    return(
        <>  
           <div className = 'movie-container'> 
            {
                selectedMovies && selectedMovies.map((movie) => <FavoritesCards key = {movie.id} {...movie} deleteFavourite = {deleteFavourite} />)
            }
           </div>
        </>
    )
}
export default Favorites