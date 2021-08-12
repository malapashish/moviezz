import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../actions/fetchTrendingListAction"; 

import Cards from "../../components/Cards";
import { Spinner } from "../../components/Spinner";
import PaginationComponent from "../../components/Pagination";

require("dotenv").config();

const Home = (props) => {
  const [page, setPage] = useState(sessionStorage.getItem("pagination") || 1);
  useEffect(() => {
    props.fetchTrendList(page);
    window.scroll(0, 0);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const handlePaginationChange = (e) => {
    setPage(parseInt(e.target.textContent));
    sessionStorage.setItem("pagination", parseInt(e.target.textContent));
  };

  return (
    <div className = 'trending-parent'>
      <span className="page-heading">
        <i className="fas fa-fire"></i>
        Trending
      </span>

      <div className="movie-container">
        <Cards contentArray={props.trendingList.trendingListData} />
      </div>
      <PaginationComponent handlePaginationChange={handlePaginationChange} />

      {props.trendingList.loading && <Spinner />}
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    trendingList: state.trendingList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchTrendList: (page) => dispatch(fetchData(page)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
