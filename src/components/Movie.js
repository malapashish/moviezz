import React from 'react';

const IMG_API = 'https://images.tmdb.org/t/p/w1280';

const Movie = ({ title , poster_path , overview , vote_average }) => {
    
    const setVoteClass = (vote) => {
        if(vote >= 8){
            return 'green'
        } else if(vote >= 6){
            return 'orange'
        } else {
            return 'red'
        }
    }
    
    return(
        <div className = 'movie'>
            <img  src = {poster_path ? IMG_API + poster_path : 
                'https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80' } alt = {title + ' poster image'} className = 'movie-img' />
            <div className = 'movie_info'>
                <h3>{title}</h3>
                <span className = {`tag ${setVoteClass(vote_average)}`} >{vote_average}</span>
            </div>
            <div className = "movie-overview">
                <h2>Overview</h2>
                <p>{overview}</p>
            </div>
        </div>
    )
}

export default Movie;