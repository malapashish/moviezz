import React , {useEffect, useState} from 'react'; 
import { Link  } from 'react-router-dom'; 
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube"; 
import BookmarkOutlinedIcon from '@material-ui/icons/BookmarkOutlined';
import BookmarkBorderIcon from '@material-ui/icons/BookmarkBorder';
import { checkRating } from '../utilities/checkRating';
import LikeMessages from '../components/LikeMessages'; 
import { movieDbAPI , imgAPI } from '../apis';
import db from '../config/firebase';
import { deleteFavourite } from '../utilities/deleteFavourite';
import Carousel from '../components/Carousel';
const IMG_API = 'https://images.tmdb.org/t/p/w1280';

require('dotenv').config() 

const SeriesDetails = ({ match : { params : {id} } }) => {
 
    const [ seriesDetails , setSeriesDetails ] = useState([]);
    const [ video , setVideo ] = useState();
    const [ linkAvailability , setLinkAvailability ] = useState();
    const [ recommendations , setRecommendations ] = useState([]);
    const [ credits , setCredits ] = useState([]);
    const [ bookmarkedContent , setBookmarkedContent] = useState([]);  
    const [ message , setMessage ] = useState(null);
    const [ isFavourite , setIsFavourite  ] = useState(false);

    useEffect(() => {
       if(id){ 
           window.scroll(0 , 0);
            const getDetails = async () => {
                await movieDbAPI
                                .get(`/tv/${id}?api_key=${process.env.REACT_APP_API_KEY}`)
                                .then((response) => { 
                                        setSeriesDetails(response.data); 
                                    });
            }
            getDetails();

            const fetchMovieList = () => {
                db
                    .collection('favorites')
                    .onSnapshot((q) => {
                    setBookmarkedContent(
                        q.docs.map((doc) => ({
                            id : doc.id ,
                            title : doc.data().title , 
                                poster_path : doc.data().image_path,
                            vote_average : doc.data().vote_average
                        }))
                    )
                }) 
            }
            fetchMovieList();

            const getYoutubeLink = async () => {
                await movieDbAPI
                                .get(`/tv/${id}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
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
                                .get(`/tv/${id}/recommendations?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&page=1`)
                                .then((response) => {
                                    setRecommendations(response.data.results)
                                    console.log(recommendations);
                                })
                            }
                            getRecommendations();

            const getCredits = async () => {
                await movieDbAPI
                                .get(`/tv/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)
                                .then((response) => {
                                    setCredits(response.data.cast)
                                })
            }
            getCredits();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[id])

    useEffect(() => { 
        if(bookmarkedContent.some((movie) => movie.title === seriesDetails.name)){
            setIsFavourite(true);
        }else{
            setIsFavourite(false);
        }
    },[bookmarkedContent , seriesDetails])


    const handleFavorites = () => {  
        console.log('Entered click handler'); 
        if(bookmarkedContent.some(content =>  content.title === seriesDetails.name)){ 
            const newArray = bookmarkedContent.filter(movie => movie.title === seriesDetails.name)  
            deleteFavourite(newArray[0].id)
            setIsFavourite(false);
            console.log("Deleting");
            setMessage('Removed from favourites');
            setTimeout(() => {
                setMessage(null);
            } , 1000)
        }else{
            db
            .collection('favorites')
            .add({
                movieId : seriesDetails.id,
                title : seriesDetails.title || seriesDetails.name,
                vote_average : seriesDetails.vote_average,
                image_path : imgAPI + seriesDetails.poster_path,
                media_type : "tv"
            })
            console.log('Adding');
            setIsFavourite(true);
            setMessage('Added to favourites');
            setTimeout(() => {
                setMessage(null);
            } , 1000)
        }
    }

    return(
        <> 
            <div className = 'movie-details'>
                <img src={seriesDetails.backdrop_path ?  imgAPI+seriesDetails.backdrop_path : 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg'} alt = 'Backdrop_Images' className = "hero-image" /> 
                <div className = 'details-section'>
                    <img  src = {seriesDetails.poster_path ?  imgAPI + seriesDetails.poster_path : 'https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg'} alt = 'Poster_Image' className = 'poster-image' />
                    <div className = 'information-section'> 
                        <span className = 'heading-section'>
                        <h3>{seriesDetails.title || seriesDetails.name}</h3>
                        {
                            isFavourite ? 
                            <button className = 'favourites-button' onClick = {() => handleFavorites(id)} >
                                <BookmarkOutlinedIcon  fontSize = 'large' /> 
                            </button> :
                            <button className = 'favourites-button' onClick = {() => handleFavorites(id)} >
                                <BookmarkBorderIcon fontSize = 'large' />
                            </button>
                        }
                        </span>
                        <section className = 'summary-section'>
                            <h4 className="summary-title">Summary:</h4>
                            <p className = 'summary-content'>{seriesDetails.overview}</p>
                        </section>
                        <section className = 'movie-stats-section'>
                            <section className = 'movie-release-date'>
                                <p>Release Date</p>
                                <p>{seriesDetails.release_date}</p>
                            </section>
                            <section className = 'movie-voting-average'>
                                <p>Voting Average</p>
                                <p className = {`tag ${checkRating(seriesDetails.vote_average)}`} >{seriesDetails.vote_average}</p>
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
                                    </Button>
                                    : ''
                                }
                            </section>
                        </section> 
                    </div>
                </div>
                        <div className = 'carouselSection'>  
                            <h3>Cast Details:</h3>
                            <span>Main Cast</span>
                            <Carousel 
                            list = {credits}
                            />
                            <div className = 'complete-crew-section'>
                                <Link to = {'/seriesdetails/' + id + '/cast'} className = 'cast-list-link'  >
                                    Full Crew and Cast Members
                                </Link>
                            </div>
                        </div>
                    <div className = 'recommendation'>
                    <h3>Recommendation:</h3>
                    <div className = 'recommendation-card-section'>
                        { recommendations && recommendations.map((movie) => (
                            <div className = 'card-container'>
                                <Link to = {'/recommendation/' + movie.id}>
                                <img 
                                src = {IMG_API + movie.poster_path}
                                alt = {movie.name}
                                className = 'recommendations-backdrop-image'
                                /> 
                                </Link>
                            </div>        
                        )) }
                    </div>  
                </div>
            </div> 
            <LikeMessages message = {message} /> 
        </> 
    )

}

export default SeriesDetails;