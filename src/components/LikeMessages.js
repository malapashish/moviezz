import React from 'react';

const LikeMessages = ({ message }) => {

    if(message === null){
        return ''
    }else {
        return(
            <div className = 'snackbar show'>
                {message}
            </div>
        )
    }



}

export default LikeMessages;