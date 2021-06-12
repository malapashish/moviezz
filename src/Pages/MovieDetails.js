import React , {useEffect, useState} from 'react'; 
import { Link } from 'react-router-dom';
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";  

import { checkRating } from '../utilities/checkRating';
import { movieDbAPI , imgAPI } from '../apis';
import Carousel from '../components/Carousel';

const IMG_API = 'https://images.tmdb.org/t/p/w1280';
require('dotenv').config();
 
const MovieDetails = ({ match : { params : {id} } }) => {
 
    const [ movieDetails , setMovieDetails ] = useState([]);
    const [ video , setVideo ] = useState();
    const [ linkAvailability , setLinkAvailability ] = useState(false);
    const [ recommendations , setRecommendations ] = useState([]);
    //fetches the details of the movie
    useEffect(() => {
       if(id){ 
            const getDetails = async () => {
                await movieDbAPI
                                .get(`/movie/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
                                .then((response) => { 
                                        setMovieDetails(response.data); 
                                    });
            }
            getDetails();

            const getYoutubeLink = async () => {
                await movieDbAPI
                                .get(`/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                                .then((response) => { 
                                    if(response.data.results.length !== 0){
                                        setVideo(response.data.results[0].key)
                                        setLinkAvailability(true);
                                    }else{
                                        setLinkAvailability(false);
                                    }
                                }) 
            }
            getYoutubeLink()

            const getRecommendations = async () => {
                await movieDbAPI 
                                .get(`/movie/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                                .then((response) => {
                                    setRecommendations(response.data.results)
                                    console.log(recommendations);
                                })
                            }
                            getRecommendations();
                        }
                        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 
    return(
        <>  
            <div className = 'movie-details'>
                <img src={movieDetails.backdrop_path ?  imgAPI+movieDetails.backdrop_path : 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg'} alt = 'Backdrop_Images' className = "hero-image" /> 
                <div className = 'details-section'>
                    <img  src = {movieDetails.poster_path ?  imgAPI + movieDetails.poster_path : 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg'} alt = 'Poster_Image' className = 'poster-image' />
                    <div className = 'information-section'>
                        <h3>{movieDetails.title}</h3>
                        <section className = 'summary-section'>
                            <h4 className="summary-title">Summary:</h4>
                            <p className = 'summary-content'>{movieDetails.overview}</p>
                        </section>
                        <section className = 'movie-stats-section'>
                            <section className = 'movie-release-date'>
                                <p>Release Date</p>
                                <p>{movieDetails.release_date}</p>
                            </section>
                            <section className = 'movie-voting-average'>
                                <p>Voting Average</p>
                                <p className = {`tag ${checkRating(movieDetails.vote_average)}`} >{movieDetails.vote_average}</p>
                            </section>
                            <section className = 'movie-trailer'>
                            {   
                                linkAvailability ?
                                <Button
                                    variant="contained"
                                    startIcon={<YouTubeIcon />}
                                    color="secondary"
                                    target="__blank"
                                    href={`https://www.youtube.com/watch?v=${video}`}
                                    >
                                    Watch the Trailer
                                </Button>:
                                ''
                            }
                            </section>
                        </section>
                    </div>
                </div>
                        <div className = 'carouselSection'>
                            <Carousel 
                            id = {id}
                            media_type = 'movie'
                            />
                            <div className = 'complete-crew-section'>
                                <Link to = '/cast' className = 'cast-list-link' >
                                    Full Crew and Cast Members
                                </Link>
                            </div>
                        </div>
                <div>
                    Recommendation 
                    <div className = 'row'>
                            {
                                recommendations.map((movie) => (
                                    <img
                                    src = {IMG_API + movie.poster_path}
                                    alt = {`${movie.title} poster`}
                                    className = 'recommendation-poster-image'
                                    />
                                ))
                            }
                    </div>
                </div>
            </div>
        </> 
    )

}

export default MovieDetails;