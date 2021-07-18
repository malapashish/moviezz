import React, { useState, useEffect } from "react";
import { Badge } from "@material-ui/core";

import { connect } from "react-redux";
import { fetchBookmarked } from "../actions/fetchbookmarkedAction";
import { deleteBookmarked } from "../firebase/deleteBookmarked";
const IMG_API = "https://images.tmdb.org/t/p/w1280";

const FavoritesCards = (props) => {
  const [favoritesList, setFavoritesList] = useState(props.bookMarked.data);
  console.log(props);
  // eslint-disable-next-line no-unused-vars

  const deleteHandler = (id) => {
    // props.deleteBookMarked(id);
    deleteBookmarked(id);
    props.fetchBookmarked();
  };

  useEffect(() => {
    setFavoritesList(props.bookMarked.data);
  }, [props.bookMarked]);

  return (
    <>
      {favoritesList &&
        favoritesList.map((favouritedMedia) => (
          <div className="favourites-card-container">
            <Badge
              badgeContent={
                <i
                  className={`delete_icon`}
                  onClick={() => deleteHandler(favouritedMedia.id)}
                />
              }
            >
              <img
                src={
                  favouritedMedia.poster_path
                    ? IMG_API + favouritedMedia.poster_path
                    : "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80"
                }
                alt={favouritedMedia.title + " poster image"}
                className="favourites-backdrop-image"
              />
            </Badge>
          </div>
        ))}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bookMarked: state.bookMarkedList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookmarked: () => dispatch(fetchBookmarked()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(FavoritesCards);
