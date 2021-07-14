import { combineReducers } from "redux";

import { trendingReducer } from "./trendingReducer";
import { detailsReducer } from "./detailsReducer";
import { bookMarkedReducer } from "./bookMarkedReducer";

export const rootReducer = combineReducers({
  trendingList: trendingReducer,
  detailsList: detailsReducer,
  bookMarkedList: bookMarkedReducer,
});
