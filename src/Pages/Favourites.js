import React , {useState , useEffect} from 'react';

import { NavLink } from 'react-router-dom'; 
import '../App.css';
import FeavouritesCards from '../components/FavouritesCard'

import db from '../config/firebase';
const Favourites = () => {
    
    const [ selectedMovies , setSelectedMovies ] = useState([]);

    
    const fetchMovieList = () => {
        db
            .collection('favourites')
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

    const deleteFavourite = (input) => {
        db
            .collection('favourites')
            .doc(input.id)
            .delete()
            .then(() => {
                console.log("Successfully Deleted");
            })
            .catch((e) => {
                console.log('Error removing document' , e);
            })
    }

    useEffect(() => {
        fetchMovieList();
    },[])

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
           <div className = 'movie-container'> 
            {
                selectedMovies && selectedMovies.map((movie) => <FeavouritesCards key = {movie.id} {...movie} deleteFavourite = {deleteFavourite} />)
            }
           </div>
        </>
    )
}
export default Favourites