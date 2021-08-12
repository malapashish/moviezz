import React, { useState, useEffect } from "react";
import Cards from "../../components/Cards";
import { useDebounce } from "../../utilities/useDebounce";
import duckSearching from "../../images/duck_searching.gif";

import { connect } from "react-redux";
import { fetchSearchedSeries } from "../../actions/searchSeriesAction";

require("dotenv").config();

const Series = (props) => {
  const [searchTerm, setSearchTerm] = useState(
    sessionStorage.getItem("searchTvTerm") || ""
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
    sessionStorage.setItem("searchTvTerm", e.target.value);
    props.fetchSearchResults(searchTerm);
  };

  return (
    <div className="search-parent">
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
              media_type: "tv",
            }))}
          />
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    searchResults: state.searchSeriesList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchSearchResults: (searchTerm) => {
      dispatch(fetchSearchedSeries(searchTerm));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Series);
