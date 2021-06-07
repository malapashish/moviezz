import React , {useEffect, useState} from 'react'; 
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";  

import './DetailsPage.css'; 
import { checkRating } from '../utilities/checkRating';
import { movieDbAPI , imgAPI } from '../apis';

require('dotenv').config();
 
const MovieDetails = ({ match : { params : {id} } }) => {
 
    const [ movieDetails , setMovieDetails ] = useState([]);
    const [ video , setVideo ] = useState();
    const [ linkAvailability , setLinkAvailability ] = useState(false);
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
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
 

    //fetches the youtube link of the trailer of that move 
    // const getYoutubeLink = () => { 
    //     axios   
    //         .get(`https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
    //         .then((response) => { 
    //             if(response.data.results.length !== 0){
    //                 setVideo(response.data.results[0].key)
    //                 setLinkAvailability(true);
    //             }else{
    //                 setLinkAvailability(false);
    //             }
    //         }) 
    // }

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
            </div>
        </> 
    )

}

export default MovieDetails;