import { FETCH_BOOKMARK_REQUEST, FETCH_BOOKMARK_SUCCESS } from "../actionTypes";

const initialState = {
  loading: false,
  data: [],
};

export const bookMarkedReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_BOOKMARK_REQUEST:
      return {
        ...state,
        loading: true,
      };

    case FETCH_BOOKMARK_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
      };

    default:
      return state;
  }
};
