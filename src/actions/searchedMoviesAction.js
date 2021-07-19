import axios from "axios";

import {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from "../actionTypes";

require("dotenv").config();

const fetchSearchedMoviesRequest = () => {
  return {
    type: SEARCH_MOVIES_REQUEST,
  };
};

const fetchSearchedMoviesSuccess = (searchResult) => {
  return {
    type: SEARCH_MOVIES_SUCCESS,
    payload: searchResult,
  };
};

const fetchSearchedMoviesFailure = (error) => {
  return {
    type: SEARCH_MOVIES_FAILURE,
    payload: error,
  };
};

export const fetchSearchedMovies = (term) => {
  return (dispatch) => {
    dispatch(fetchSearchedMoviesRequest());
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}`
      )
      .then((response) => {
        console.log("Results", response.data.results);
        dispatch(fetchSearchedMoviesSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchSearchedMoviesFailure(error.message));
      });
  };
};
