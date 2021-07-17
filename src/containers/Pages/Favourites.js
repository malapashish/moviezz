import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import FavoritesCards from "../FavouritesCard";
import { deleteFavourite } from "../../utilities/deleteFavourite";
import { fetchBookmarked } from "../../actions/fetchbookmarkedAction";
import { Spinner } from "../../components/Spinner";

import db from "../../utilities/firebase";
const Favorites = (props) => {
  const [selectedMovies, setSelectedMovies] = useState([]);

  const fetchMovieList = () => {
    db.collection("favorites").onSnapshot((q) => {
      setSelectedMovies(
        q.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          poster_path: doc.data().image_path,
          vote_average: doc.data().vote_average,
          movieId: doc.data().movieId,
          media_type: doc.data().mediaType,
        }))
      );
    });
  };

  useEffect(() => {
    // fetchMovieList();
    props.fetchBookMarkedList();
  }, []);

  return (
    <>
      <div className="movie-container">
        {console.log(props.bookMarkedList)}
        <FavoritesCards />
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    bookMarkedList: state.bookMarkedList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBookMarkedList: () => dispatch(fetchBookmarked()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);
