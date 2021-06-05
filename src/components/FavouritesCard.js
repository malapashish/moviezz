import React, { useState , useEffect } from 'react'; 
import { Link } from 'react-router-dom';

import db from '../config/firebase';
import { checkRating } from '../utilities/checkRating';

const IMG_API = 'https://images.tmdb.org/t/p/w1280';


const FavoritesCards = (props) => { 
    const [ isLiked , setIsLiked ] = useState(false);
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
        props.deleteFavourite(props); 
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
        <div className = 'movie'>
            <img  src = {props.poster_path ? IMG_API + props.poster_path : 
                'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80' } 
                alt = {props.title + ' poster image'} className = 'movie-img' />
            <div className = 'movie_info'>
                <h3 className = {checkWordLength(props)}>{props.title}</h3>
                <p className = {`rating`} >
                    Rating:
                    <span className = {`tag ${checkRating(props.vote_average)}`} >{props.vote_average}</span> 
                </p>
                <i className = {`delete_icon ${ isLiked ? 'pressed' : '' }`} onClick = {deleteHandler}></i>
                {
                    props.media_type === 'movie' ?
                    <Link className = 'read-more' to = {'/moviedetails/' + props.movieId}>
                        <button className = 'button read-more-button'>
                            Read More..
                        </button> 
                    </Link> :
                    <Link className = 'read-more' to = {'/seriesdetails/' + props.movieId}>
                        <button className = 'button read-more-button'>
                            Read More..
                        </button> 
                    </Link>
                }   
            </div> 
        </div>
    )
}

export default FavoritesCards;