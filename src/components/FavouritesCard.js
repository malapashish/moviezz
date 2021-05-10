import React, { useState , useEffect } from 'react'; 

import db from '../config/firebase';

const IMG_API = 'https://images.tmdb.org/t/p/w1280';


const FeavouritesCards = (props) => {

    const [ isliked , setIsLiked ] = useState(false);
    const [selectedMovies , setSelectedMovies] = useState([]);

     

    useEffect(() => {
        fetchMovieList();
    },[])

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

    const setVoteClass = (vote) => {
        if(vote >= 8){
            return 'green'
        } else if(vote >= 6){
            return 'orange'
        } else {
            return 'red'
        }
    }

    // const checkifLiked = (title) =>{
    //     if(selectedMovies.some((movie) => movie.title === title)){
    //         return 'pressed';
    //     }else{
    //         return '';
    //     }
    // }
 
    
    const likeHandler = () =>{ 
        setIsLiked(true);
        props.deleteFavourite(props)
    }

    return(
        <div className = 'movie'>
            <img  src = {props.poster_path ? IMG_API + props.poster_path : 
                'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80' } 
                alt = {props.title + ' poster image'} className = 'movie-img' />
            <div className = 'movie_info'>
                <h3>{props.title}</h3>
                <span className = {`tag ${setVoteClass(props.vote_average)}`} >{props.vote_average}</span>
                <i className = {`delete_icon ${ isliked ? 'pressed' : '' }`} onClick = {likeHandler}></i>
            </div> 
        </div>
    )
}

export default FeavouritesCards;