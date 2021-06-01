import React , {useEffect, useState} from 'react';
import axios from 'axios';
import { NavLink , Link } from 'react-router-dom'; 
import './MovieDetails.css';
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube"; 
const IMG_API = 'https://images.tmdb.org/t/p/w1280'; 

const MovieDetails = ({ match : { params : {id} } }) => {
 
    const [ movieDetails , setMovieDetails ] = useState([]);
    const [ video , setVideo ] = useState();

    useEffect(() => {
       if(id){
            axios 
                .get(`https://api.themoviedb.org/3/movie/${id}?api_key=8e226ac94d6cb225fcb0652695f029d7`)
                .then((response) => { 
                    setMovieDetails(response.data); 
                }); 
        }
    },[id])

 

    const checkrating = (rating) => {
        if(rating >= 8){
            return 'green'
        } else if(rating >= 6){
            return 'orange'
        } else {
            return 'red'
        }
    }

    const getYoutubeLink = () => { 
        axios   
            .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=8e226ac94d6cb225fcb0652695f029d7&language=en-US`)
            .then((response) => { 
                setVideo(response.data.results[0].key)
            }) 
    }

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
                {/* <div className = 'search-container'>
                    <form onSubmit = {handleOnSubmit}>
                    <input
                    className = 'search'
                    type = 'text'
                    placeholder = 'Search...'
                    value = {searchTerm}
                    onChange = {handleSearchTerm}
                    />
                    </form>
                </div> */}
            </nav>
            {getYoutubeLink()}
            <div>
                <img src={movieDetails.backdrop_path ?  IMG_API+movieDetails.backdrop_path : 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg'} alt = 'Backdrop_Images' className = "hero-image" /> 
            </div>
            <div className = 'second-section'>
                <img  src = {movieDetails.poster_path ?  IMG_API + movieDetails.poster_path : 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg'} alt = 'Poster_Image' className = 'poster-image' />
                <div className = 'content-container'>
                    <h3>{movieDetails.title}</h3>
                    <section className = 'content-section'>
                        <h4 class="summary-title">Summary:</h4>
                        <p className = 'summary-content'>
                            {movieDetails.overview}
                        </p>
                    </section> 
                <section className = 'stats-section'>
                    <section className = "release-date"> 
                        <p>Release Date</p>
                        <p>{movieDetails.release_date}</p>
                    </section>
                    <section className = 'voting-average'>
                        <p>Voting Average</p>
                        <p className = {`tag ${checkrating(movieDetails.vote_average)}`} >{movieDetails.vote_average}</p>
                    </section>
                    <section className = 'see_trailler'>
                         <Button
                            variant="contained"
                            startIcon={<YouTubeIcon />}
                            color="secondary"
                            target="__blank"
                            href={`https://www.youtube.com/watch?v=${video}`}
                        >
                            Watch the Trailer
                        </Button>
                    </section>
                </section>
                </div>
            </div>
        </> 
    )

}

export default MovieDetails;