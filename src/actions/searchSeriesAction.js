import axios from "axios";

import {
  SEARCH_SERIES_REQUEST,
  SEARCH_SERIES_SUCCESS,
  SEARCH_SERIES_FAILURE,
} from "../actionTypes";

require("dotenv").config();

const fetchSearchedSeriesRequest = () => {
  return {
    type: SEARCH_SERIES_REQUEST,
  };
};

const fetchSearchedSeriesSuccess = (searchResult) => {
  return {
    type: SEARCH_SERIES_SUCCESS,
    payload: searchResult,
  };
};

const fetchSearchedSeriesFailure = (error) => {
  return {
    type: SEARCH_SERIES_FAILURE,
    payload: error,
  };
};

export const fetchSearchedSeries = (term) => {
  return (dispatch) => {
    dispatch(fetchSearchedSeriesRequest());
    axios
      .get(
        `https://api.themoviedb.org/3/search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}`
      )
      .then((response) => {
        dispatch(fetchSearchedSeriesSuccess(response.data.results));
      })
      .catch((error) => {
        dispatch(fetchSearchedSeriesFailure(error.message));
      });
  };
};
