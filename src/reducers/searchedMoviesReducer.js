import {
  SEARCH_MOVIES_REQUEST,
  SEARCH_MOVIES_SUCCESS,
  SEARCH_MOVIES_FAILURE,
} from "../actionTypes";

const initialState = {
  loading: false,
  resultArray: [],
  error: "",
};

export const searchMoviesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_MOVIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_MOVIES_SUCCESS:
      return {
        ...state,
        loading: false,
        resultArray: action.payload,
        error: "",
      };

    case SEARCH_MOVIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
