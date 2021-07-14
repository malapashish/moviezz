import { FETCH_DETAILS_REQUEST , FETCH_DETAILS_SUCCESS , FETCH_DETAILS_ERROR } from "../actionTypes";

const initialState = {
    loading : false,
    mediaDetails : [],
    bookmarkedMedia : [],
    error : '',
}

export const detailsReducer = (state = initialState , action) => {
    switch(action.type){
        case FETCH_DETAILS_REQUEST : return{
            ...state,
            loading : true,
        }

        case FETCH_DETAILS_SUCCESS : return{
            ...state,
            loading : false,
            mediaDetails : action.payload,
        }

        case FETCH_DETAILS_ERROR : return{
            ...state,
            loading : false,
            error : action.payload
        }

        default : return state
    }
}