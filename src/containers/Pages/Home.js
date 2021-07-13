import React , { useState , useEffect } from 'react'; 

import Cards from '../../components/Cards';
import CustomPagination from '../../components/Pagination';
// import LikeMessages from '../../components/LikeMessages'; 
import LikeMessages from '../../components/LikeMessages';
import db from '../../utilities/firebase';
import { movieDbAPI , imgAPI } from '../../apis';  

require('dotenv').config();  

const Home = () => {
    const [ page, setPage ] = useState(1);
    const [ contentList , setContentList ] = useState([]); 
    const [ favoriteContent , setFavoriteContent] = useState([]);
    const [ repeatedLiked , setRepeatedLiked ] = useState(null); 
    const [ message , setMessage ] = useState(null);
 

    //fetches the movie and series list also fetches favoured movie and series list
    useEffect(() => {
        const getTrendingList = async () => {
        await movieDbAPI
                        .get(`/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
                        .then((response) => {
                            setContentList(response.data.results);
                        })
        }
        getTrendingList();
        fetchFavourites();
        window.scroll(0, 0); 
    }, [page])
    
    //fetches favoured movie and list
    const fetchFavourites = () => {
        db
            .collection('favorites')
            .onSnapshot((q) => {
               setFavoriteContent(
                   q.docs.map((doc) => ({
                       id : doc.id ,
                       title : doc.data().title , 
                        poster_path : doc.data().image_path,
                       vote_average : doc.data().vote_average
                   }))
               )
           }) 
    }

    /*onclick handler which check if selected movie or series already added into favoured list or not. 
    If not added add the movie or list if already added then show a warning saying that the 
    movie or series already added to the favoured list. 
    */
    const handleFavorites = (input) => {  
        if(favoriteContent.some(content =>  content.title === (input.title || input.name))){
            console.log(favoriteContent);
            setRepeatedLiked(true); 
            setTimeout(() => {
                setRepeatedLiked(null);
            } , 500);
        }else{
            db
            .collection('favorites')
            .add({
                movieId : input.id,
                title : input.title || input.name,
                vote_average : input.vote_average,
                image_path : imgAPI + input.poster_path,
                media_type : input.media_type
            })
            setMessage('Added to the favorites');
            setTimeout(() => {
                setMessage(null);
            } , 500) 
        }
    }
 
    return(
        <>  
        <span className = 'page-heading'> 
            <i className="fas fa-fire"></i>   
            Trending
        </span>
        <div className = 'movie-container'>      
            { contentList && contentList.map((content) => <Cards key = {content.id} {...content} handleFavorites = {handleFavorites} />) }
        </div>
        <LikeMessages message = {message} />
        {
            repeatedLiked && (
                <div className = 'snackbar show'>
                    Already added in the favorites..
                </div>
            )
        }
        <CustomPagination  setPage = {setPage} />
        </>
    )
}

export default Home;