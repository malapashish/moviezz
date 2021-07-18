import axios from 'axios';

import { FETCH_DATA_REQUEST , FETCH_DATA_SUCCESS , FETCH_DATA_FAILURE } from "../actionTypes";
require('dotenv').config();


/*Action Creators for fetching trending data list*/
const fetchDataRequest = () => {
    return{
        type : FETCH_DATA_REQUEST
    };
};

const fetchDataSuccess = (media) => {
    return{
        type : FETCH_DATA_SUCCESS,
        payload : media
    };
};

const fetchDataFailure = (error) => {
    return{
        type : FETCH_DATA_FAILURE,
        payload : error
    };  
};

export const fetchData = (page) => {
    return (dispatch) => {
        dispatch(fetchDataRequest());
        axios.get(`https://api.themoviedb.org/3/trending/all/day?api_key=${process.env.REACT_APP_API_KEY}&page=${page}`)
             .then((response) => {
                 dispatch(fetchDataSuccess(response.data.results))
             })
             .catch((error) => {
                 fetchDataFailure(error.message)
             })
    }
} 



