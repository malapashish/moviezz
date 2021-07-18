import React from "react";

import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";

const BookmarkButton = ({
  isAlreadyExists,
  mediaDetails,
  bookmarkedList,
  handleFavorites,
}) => {
  if (isAlreadyExists) {
    return (
      <button
        className="favourites-button"
        onClick={() => handleFavorites(mediaDetails, bookmarkedList)}
      >
        <BookmarkOutlinedIcon fontSize="large" />
      </button>
    );
  } else {
    return (
      <button
        className="favourites-button"
        onClick={() => handleFavorites(mediaDetails, bookmarkedList)}
      >
        <BookmarkBorderIcon fontSize="large" />
      </button>
    );
  }
};

export default BookmarkButton;
