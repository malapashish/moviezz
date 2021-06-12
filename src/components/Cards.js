import React, { useState , useEffect } from 'react'; 
import db from '../config/firebase';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Img from './3308709 1.png';
import { checkRating } from '../utilities/checkRating'; 
const IMG_API = 'https://images.tmdb.org/t/p/w1280';
require('dotenv').config();

const  Cards = (props) => { 
 

    // eslint-disable-next-line no-unused-vars
    const [ isLiked , setIsLiked ] = useState(false);
    const [selectedMovies , setSelectedMovies] = useState([]);
    const [ video , setVideo ] = useState('');
     

    useEffect(() => {
        fetchMovieList(); 
        getYoutubeLink(props.id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
                       vote_average : doc.data().vote_average
                   }))
               )
           }) 
    }

    const getYoutubeLink = (id) => { 
        if(props.media_type === 'movie')
        {
         axios   
            .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then((response) => { 
                if(response.data.results[0]){
                setVideo(response.data.results[0].key);}
            })}
        else{
            axios   
            .get(`https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
            .then((response) => { 
                if(response.data.results[0]){
                setVideo(response.data.results[0].key);} 
            })
        } 
    }
 

    const checkIfLiked = (title) =>{
        if(selectedMovies.some((movie) => movie.title === title)){
            return 'pressed';
        }else{
            return '';
        }
    }
 
    
    const likeHandler = () =>{ 
        setIsLiked(true);
        props.handleFavorites(props); 
    }

    const checkWordLength = (input) => {
        if(input.title){
            if(input.title.length < 30){
                return 'normal_title';
            }else{
                return 'small_title';
            }
        }else if(input.name){
            if(input.name.length < 30){
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
                <a href = {`https://www.youtube.com/watch?v=${video}`} target = "_blank" rel="noreferrer" >
                <img
                alt = 'playButton_icon'
                className = 'playButton_icon'   
                src = {Img}
                />
                </a> 
                <h3 className = {checkWordLength(props)}>{props.title || props.name}</h3>
                <p className = {`rating`} >
                    Rating:
                    <span className = {`tag ${checkRating(props.vote_average)}`} >{props.vote_average}</span> 
                </p> 
                <i className = {`heart_icon ${checkIfLiked(props.title || props.name)}`} onClick = {likeHandler}></i>
            </div> 
                {
                    props.media_type === 'tv' ?
                    <Link className = 'read-more' to = {'/seriesdetails/' + props.id}>
                        <button className = 'button read-more-button'>
                            Read More..
                        </button> 
                    </Link> : 
                    <Link className = 'read-more' to = {'/moviedetails/' + props.id}>
                        <button className = 'button read-more-button'>
                            Read More..
                        </button> 
                    </Link>  
                }            
        </div>
    )
}

export default Cards;