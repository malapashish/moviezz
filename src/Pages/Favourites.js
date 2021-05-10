import React , {useState , useEffect} from 'react';

import { Link } from 'react-router-dom';
import Img from '../Group 1.png';
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
                       vote_average : doc.data().vote_average
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
            {/* <form onSubmit = {handleOnSubmit}>
            <input
            className = 'search'
            type = 'search'
            placeholder = 'Search...'
            value = {searchTerm}
            onChange = {handleSearchTerm}
            />
            </form> */}
           </header>
           <div className = 'movie-container'> 
            {
                selectedMovies && selectedMovies.map((movie) => <FeavouritesCards key = {movie.id} {...movie} deleteFavourite = {deleteFavourite} />)
            }
           </div>
        </>
    )
}
export default Favourites