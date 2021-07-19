import React, { useEffect } from "react";
import { connect } from "react-redux";

import FavoritesCards from "../../components/FavouritesCard";
import { fetchBookmarked } from "../../actions/fetchbookmarkedAction";
import { deleteBookmarked } from "../../firebase/deleteBookmarked";
import { Spinner } from "../../components/Spinner";

const Favorites = ({ fetchBookMarkedList, bookMarkedList }) => {
  useEffect(() => {
    fetchBookMarkedList();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const deleteHandler = (id) => {
    deleteBookmarked(id).then(() => {
      fetchBookMarkedList();
    });
  };

  return (
    <>
      <div className="movie-container">
        <FavoritesCards
          deleteHandler={deleteHandler}
          bookMarkedList={bookMarkedList.data}
        />
        {bookMarkedList.loading && <Spinner />}
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
