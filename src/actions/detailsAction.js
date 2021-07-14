import axios from "axios";

import {
  FETCH_DETAILS_REQUEST,
  FETCH_DETAILS_SUCCESS,
  FETCH_DETAILS_ERROR,
} from "../actionTypes";

require("dotenv").config();

const fetchData = () => {
  return {
    type: FETCH_DETAILS_REQUEST,
  };
};

const fetchDataSuccess = (details) => {
  return {
    type: FETCH_DETAILS_SUCCESS,
    payload: details,
  };
};

const fetchDataError = (error) => {
  return {
    type: FETCH_DETAILS_ERROR,
    payload: error,
  };
};

export const fetchDetails = (mediaType, mediaID) => {
  return (dispatch) => {
    dispatch(fetchData());
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${mediaID}?api_key=${process.env.REACT_APP_API_KEY}`
      )
      .then((response) => {
        dispatch(fetchDataSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchDataError(error));
      });
  };
};
