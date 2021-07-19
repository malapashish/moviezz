import { FETCH_BOOKMARK_REQUEST, FETCH_BOOKMARK_SUCCESS } from "../actionTypes";

import db from "../utilities/firebase";

const fetchBookmarkRequest = () => {
  return {
    type: FETCH_BOOKMARK_REQUEST,
  };
};

const fetchBookmarkSuccess = (bookmarkedList) => {
  return {
    type: FETCH_BOOKMARK_SUCCESS,
    payload: bookmarkedList,
  };
};

export const fetchBookmarked = () => {
  let bookMarkedList = [];
  return (dispatch) => {
    dispatch(fetchBookmarkRequest());
    db.collection("favorites")
      .get()
      .then((response) => {
        bookMarkedList = response.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          poster_path: doc.data().image_path,
          vote_average: doc.data().vote_average,
        }));
        dispatch(fetchBookmarkSuccess(bookMarkedList));
      });
  };
};
