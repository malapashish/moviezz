import {
  SEARCH_SERIES_REQUEST,
  SEARCH_SERIES_SUCCESS,
  SEARCH_SERIES_FAILURE,
} from "../actionTypes";

const initialState = {
  loading: false,
  resultArray: [],
  error: "",
};

export const searchedSeriesReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_SERIES_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case SEARCH_SERIES_SUCCESS:
      return {
        ...state,
        loading: false,
        resultArray: action.payload,
      };

    case SEARCH_SERIES_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
