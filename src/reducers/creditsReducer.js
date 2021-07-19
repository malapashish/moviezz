import {
  FETCH_CREDITS_REQUEST,
  FETCH_CREDITS_SUCCESS,
  FETCH_CREDITS_FAILURE,
} from "../actionTypes";

const initialState = {
  loading: false,
  creditsArray: [],
  error: "",
};

export const creditsReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CREDITS_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_CREDITS_SUCCESS:
      return {
        ...state,
        loading: false,
        creditsArray: action.payload,
      };

    case FETCH_CREDITS_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
