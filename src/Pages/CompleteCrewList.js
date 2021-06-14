import React , { useEffect, useState } from 'react';

import { movieDbAPI } from '../apis'; 

require('dotenv').config();

const CompleteCrewList = ({ match : { params : {id} } }) => {

    const [ castList , setCastList ] = useState([]);
    const [ crewList , setCrewList ] = useState({})

    useEffect(() => {
        movieDbAPI
                    .get(`/movie/${id}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`)                
                    .then((response) => {
                        setCastList(response.data.cast);
                        filterCrew(response.data.crew);
                    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])


    const filterCrew = (list) => {
        const production = list.filter((crewMember) => crewMember.department === 'Production')   
        const writing = list.filter((crewMember) => crewMember.department === 'Writing')
        const sound = list.filter((crewMember) => crewMember.department === 'Sound')
        const camera = list.filter((crewMember) => crewMember.department === 'Camera' )
        setCrewList({ ...crewList , production , writing , sound , camera}) 
    }

    return(
        <div className = 'crew-details-section-container'> 
            <div className = 'cast-section-container'>
                <h3>Cast:<span className = 'members-count' >{ castList && castList.length }</span></h3>
                <div className = 'cast-section'>
                    {
                        castList && castList.map((cast) => ( 
                            <div className = 'cast-card-container'>
                                <img
                                src = {cast.profile_path ?  `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : 'https://thumbs.dreamstime.com/b/user-icon-glyph-gray-background-106603565.jpg'} 
                                alt = {cast.name} 
                                className = 'cast_profile'
                                />
                                <b className = 'cast-member-name' >{cast.name}</b>    
                            </div> 
                        ))
                    }
                </div>
            </div>
            <div className = 'crew-section-container'>                 
                <h3>Crew</h3>
                { crewList.production && <>{ crewList.production.length === 0 ? '' : <h4>Production:<span className = 'members-count'>{crewList.production.length}</span></h4> }</> }
                <div className = 'crew-cast-section'>
                    { crewList.production && crewList.production.map((cast) => ( 
                        <div className = 'crew-card-container'>
                            <img
                            src = {cast.profile_path ?  `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : 'https://thumbs.dreamstime.com/b/user-icon-glyph-gray-background-106603565.jpg'} 
                            alt = {cast.name} 
                            className = 'crew_profile'
                            />
                            <b className = 'crew-member-name' >{cast.name}</b>    
                        </div> 
                    )) }
                </div> 
                { crewList.writing && <>{ crewList.writing.length === 0 ? '' : <h4>Writing:<span className = 'members-count'>{crewList.writing.length}</span></h4> }</> }
                <div className = 'crew-cast-section'>
                    { crewList.writing && crewList.writing.map((cast) => ( 
                        <div className = 'crew-card-container'>
                            <img
                            src = {cast.profile_path ?  `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : 'https://thumbs.dreamstime.com/b/user-icon-glyph-gray-background-106603565.jpg'} 
                            alt = {cast.name} 
                            className = 'crew_profile'
                            />
                            <b className = 'crew-member-name' >{cast.name}</b>    
                        </div> 
                    )) }
                </div> 
                { crewList.sound && <>{ crewList.sound.length === 0 ? '' : <h4>Sound:<span className = 'members-count'>{crewList.sound.length}</span></h4>}</> }
                <div className = 'crew-cast-section'>
                    { crewList.sound && crewList.sound.map((cast) => ( 
                        <div className = 'crew-card-container'>
                            <img
                            src = {cast.profile_path ?  `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : 'https://thumbs.dreamstime.com/b/user-icon-glyph-gray-background-106603565.jpg'} 
                            alt = {cast.name} 
                            className = 'crew_profile'
                            />
                            <b className = 'crew-member-name' >{cast.name}</b>    
                        </div>
                    )) }
                </div> 
                { crewList.camera && <>{ crewList.camera.length === 0 ? '' : <h4>Sound:<span className = 'members-count'>{crewList.camera.length}</span></h4>}</> }
                <div className = 'crew-cast-section'>
                    { crewList.camera && crewList.camera.map((cast) => ( 
                        <div className = 'crew-card-container'>
                            <img
                            src = {cast.profile_path ?  `https://image.tmdb.org/t/p/w500/${cast.profile_path}` : 'https://thumbs.dreamstime.com/b/user-icon-glyph-gray-background-106603565.jpg'} 
                            alt = {cast.name} 
                            className = 'crew_profile'
                            />
                            <b className = 'crew-member-name' >{cast.name}</b>    
                        </div>
                    )) }
                </div> 
            </div>   
        </div>
    )
};

export default CompleteCrewList;