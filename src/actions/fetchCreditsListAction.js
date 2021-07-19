import axios from "axios";

import {
  FETCH_CREDITS_REQUEST,
  FETCH_CREDITS_SUCCESS,
  FETCH_CREDITS_FAILURE,
} from "../actionTypes";

require("dotenv").config();

const fetchCreditRequest = () => {
  return {
    type: FETCH_CREDITS_REQUEST,
  };
};

const fetchCreditSuccess = (credits) => {
  return {
    type: FETCH_CREDITS_SUCCESS,
    payload: credits,
  };
};

const fetchCreditFailure = (error) => {
  return {
    type: FETCH_CREDITS_FAILURE,
    payload: error,
  };
};

export const fetchCredit = (mediaType, mediaID) => {
  return (dispatch) => {
    dispatch(fetchCreditRequest());
    axios
      .get(
        `https://api.themoviedb.org/3/${mediaType}/${mediaID}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
      )
      .then((response) => {
        dispatch(fetchCreditSuccess(response.data));
      })
      .catch((error) => {
        dispatch(fetchCreditFailure(error.message));
      });
  };
};
