import React, { useEffect } from "react";
import { connect } from "react-redux";

import FavoritesCards from "../FavouritesCard";
import { fetchBookmarked } from "../../actions/fetchbookmarkedAction";

const Favorites = (props) => {
  useEffect(() => {
    // fetchMovieList();
    props.fetchBookMarkedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
