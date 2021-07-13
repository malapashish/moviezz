import { combineReducers } from "redux";

import { trendingReducer } from "./trendingReducer";

export const rootReducer = combineReducers({
    trendingList : trendingReducer
});