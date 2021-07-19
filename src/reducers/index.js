import { combineReducers } from "redux";

import { trendingReducer } from "./trendingReducer";
import { detailsReducer } from "./detailsReducer";
import { bookMarkedReducer } from "./bookMarkedReducer";
import { creditsReducer } from "./creditsReducer";
import { searchMoviesReducer } from "./searchedMoviesReducer";
import { searchedSeriesReducer } from "./searchedSeriesReducer";

export const rootReducer = combineReducers({
  trendingList: trendingReducer,
  detailsList: detailsReducer,
  bookMarkedList: bookMarkedReducer,
  creditsList: creditsReducer,
  searchMoviesList: searchMoviesReducer,
  searchSeriesList: searchedSeriesReducer,
});
