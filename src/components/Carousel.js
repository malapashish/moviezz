import React , { useState , useEffect } from 'react';
import axios from 'axios';
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

require('dotenv').config(); 

const Carousel = ({ id , media_type }) => {
    
    const [ carousel , setCarousel ] = useState([]);
    
    useEffect(() => {
        fetchCredits()
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    

    const handleDragStart = (e) => e.preventDefault();

    const fetchCredits = async () => {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
    );
    setCarousel(data.cast);
    };
   

    const responsive = {
        0: {
        items: 3,
        },
        512: {
        items: 5,
        },
        1024: {
        items: 7,
        },
    };

    const carouselList = carousel.map((c) => (
        <div className = 'carouselDiv'>
            
            <img 
            src = { c.profile_path ?  `https://image.tmdb.org/t/p/w300/${c.profile_path}` : 'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80'}
            alt = {c.name}
            onDragStart={handleDragStart}
            className = 'carouselImg'
            />
            <b>{c.name}</b>
        </div>
    ))

    console.log(carouselList.length);

    return(
        <>    
            <h3>Cast Details:</h3>
            {
                carouselList.length < 2 ?  
                <div className = 'alert'>
                    <span>Cast Details are not available</span> 
                </div>:
                <>
                    <span>Main Cast</span>
                    <AliceCarousel 
                    mouseTracking
                    infinite
                    disableDotsControls
                    disableButtonsControls
                    responsive = {responsive}
                    items = {carouselList}
                    autoPlay
                    />
                </>
            } 
        </>
    );
};

export default Carousel;