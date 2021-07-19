import React, { useState, useEffect } from "react";

import Cards from "../../components/Cards";
import { useDebounce } from "../../utilities/useDebounce";
import duckSearching from "../../images/duck_searching.gif";

import { connect } from "react-redux";
import { fetchSearchedMovies } from "../../actions/searchedMoviesAction";

require("dotenv").config();

const Movie = (props) => {
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem("searchMovieTerm") || ""
  );
  const [isSearching, setIsSearching] = useState(false);

  const debouncedSearchTerm = useDebounce(searchTerm, 1000);

  useEffect(() => {
    if (debouncedSearchTerm) {
      props.fetchSearchResults(debouncedSearchTerm);
      setIsSearching(false);
    } else {
      setIsSearching(true);
      props.fetchSearchResults("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchTerm]);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
    sessionStorage.setItem("searchMovieTerm", e.target.value);
    props.fetchSearchResults(searchTerm);
  };

  return (
    <>
      {console.log(props.searchResults)}
      <div className="wrap">
        <input
          className="search"
          type="text"
          placeholder="Enter Movie name Here"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      <div className="movie-container">
        {isSearching ? (
          <div style={{ textAlign: "center" }}>
            <img
              src={duckSearching}
              alt="Searching Gif"
              className="searching-gif"
            />
            Searching.......
          </div>
        ) : (
          <Cards
            contentArray={props.searchResults.resultArray.map((element) => ({
              ...element,
              media_type: "movie",
            }))}
          />
        )}
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  console.log("State", state.searchMoviesList);
  return {
    searchResults: state.searchMoviesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchResults: (searchTerm) => {
      dispatch(fetchSearchedMovies(searchTerm));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Movie);
