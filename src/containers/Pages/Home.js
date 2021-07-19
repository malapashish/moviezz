import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { fetchData } from "../../actions/fetchTrendingListAction";

import Cards from "../../components/Cards";
import CustomPagination from "../../components/Pagination";
import { Spinner } from "../../components/Spinner";

require("dotenv").config();

const Home = (props) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    props.fetchTrendList(page);
    window.scroll(0, 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  return (
    <>
      <span className="page-heading">
        <i className="fas fa-fire"></i>
        Trending
      </span>
      <div className="movie-container">
        <Cards contentArray={props.trendingList.trendingListData} />
      </div>
      <CustomPagination setPage={setPage} />
      {props.trendingList.loading && <Spinner />}
    </>
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
