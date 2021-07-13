import React, { useState , useEffect } from 'react'; 
import { Link } from 'react-router-dom';

import db from '../utilities/firebase';
import { checkRating } from '../utilities/checkRating';
import { deleteFavourite } from '../utilities/deleteFavourite';
const IMG_API = 'https://images.tmdb.org/t/p/w1280';


const FavoritesCards = (props) => { 
    const [ isLiked , setIsLiked ] = useState(false);
    console.log(props);
    // eslint-disable-next-line no-unused-vars
    const [selectedMovies , setSelectedMovies] = useState([]);

     

    useEffect(() => {
        fetchMovieList();
    },[])

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

    const deleteHandler = () =>{ 
        setIsLiked(true);
        deleteFavourite(props.id);
    }

    const checkWordLength = (input) => {
        if(input.title){
            if(input.title.length < 53){
                return 'normal_title';
            }else{
                return 'small_title';
            }
        }else if(input.name){
            if(input.name.length < 53){
                return 'normal_title';
            }else{
                return 'small_title';
            }
        }
    }

    return(
        <div className = 'card_container'>
            <img  src = {props.poster_path ? IMG_API + props.poster_path : 
                'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80' } 
                alt = {props.title + ' poster image'} className = 'card_poster' />
            <div className = 'movie_info'>
                <h3 className = {checkWordLength(props)}>{props.title || props.name}</h3>
                <p className = {`rating`} >
                    Rating:
                    <span className = {`tag ${checkRating(props.vote_average)}`} >{props.vote_average}</span> 
                </p>
                <i className = {`delete_icon ${ isLiked ? 'pressed' : '' }`} onClick = {deleteHandler}></i>
                    <Link className = 'read-more' to = {`fav/details/${props.movieId + '_' + props.media_type}`}>
                        <button className = 'button read-more-button'>
                            Read More..
                        </button> 
                    </Link>
            </div> 
        </div>
    )
}

export default FavoritesCards;