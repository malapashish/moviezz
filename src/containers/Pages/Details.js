import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { voteRating } from "../../utilities/checkRating";
import { movieDbAPI, imgAPI } from "../../apis";
import Snackbar from "../../components/LikeMessages";
import Carousel from "../../components/Carousel";
import { Spinner } from "../../components/Spinner";
import YouTubeButton from "../../components/YouTubeTrailerButton";
import BookmarkButton from "../../components/BookmarkButton";

import { addBookmarked } from "../../firebase/addBookmarked";
import { deleteBookmarked } from "../../firebase/deleteBookmarked";

/*Redux imports*/
import { connect } from "react-redux";
import { fetchDetails } from "../../actions/detailsAction";
import { fetchBookmarked } from "../../actions/fetchbookmarkedAction";
import { fetchCredit } from "../../actions/fetchCreditsListAction";

require("dotenv").config();

const MovieDetails = (props) => {
  const id = props.match.params.id;

  const history = useHistory();

  const [video, setVideo] = useState();
  const [linkAvailability, setLinkAvailability] = useState(false);
  const [message, setMessage] = useState(null);
  const [isFavourite, setIsFavourite] = useState(false);
  const [mediaID, setMediaID] = useState(id.split("_")[0]);
  const [mediaType, setMediaType] = useState(id.split("_")[1]);
  //fetches the details of the movie
  useEffect(() => {
    window.scroll(0, 0);
    setMediaID(id.split("_")[0]);
    setMediaType(id.split("_")[1]);
    props.fetchDetails(mediaType, mediaID);
    props.fetchBookmarked();
    props.fetchCredit(mediaType, mediaID);

    const getYoutubeLink = async () => {
      await movieDbAPI
        .get(
          `/${mediaType}/${mediaID}/videos?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        .then((response) => {
          if (response.data.results.length !== 0) {
            setVideo(response.data.results[0].key);
            setLinkAvailability(true);
          } else {
            setLinkAvailability(false);
          }
        });
    };
    getYoutubeLink();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const checkIfExists = (title, bookMarkedList) => {
    return bookMarkedList.some((media) => media.title === title);
  };

  useEffect(() => {
    if (
      checkIfExists(
        props.detailsList.mediaDetails.name ||
          props.detailsList.mediaDetails.title,
        props.bookMarkedList.data
      )
    ) {
      setIsFavourite(true);
    } else {
      setIsFavourite(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.bookMarkedList, props.detailsList]);

  const handleFavorites = (mediaName, bookMarkedList) => {
    if (
      bookMarkedList.some(
        (content) => content.title === (mediaName.title || mediaName.name)
      )
    ) {
      const newArray = bookMarkedList.filter(
        (movie) => movie.title === (mediaName.name || mediaName.title)
      );
      deleteBookmarked(newArray[0].id).then(() => {
        props.fetchBookmarked();
        setMessage("Removed from favourites");
        setIsFavourite(!isFavourite);
      });
    } else {
      addBookmarked({ ...mediaName, mediaType }).then(() => {
        props.fetchBookmarked();
        setMessage("Added to favourites");
        setIsFavourite(!isFavourite);
      });
    }
  };

  return (
    <>
      <div className="movie-details">
        <img
          src={
            props.detailsList.mediaDetails.backdrop_path
              ? imgAPI + props.detailsList.mediaDetails.backdrop_path
              : "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg"
          }
          alt="Backdrop_Images"
          className="hero-image"
        />
        <div className="details-section">
          <img
            src={
              props.detailsList.mediaDetails.poster_path
                ? imgAPI + props.detailsList.mediaDetails.poster_path
                : "https://image.shutterstock.com/image-vector/picture-vector-icon-no-image-600w-1350441335.jpg"
            }
            alt="Poster_Image"
            className="poster-image"
          />
          <div className="information-section">
            <span className="heading-section">
              <h3>
                {props.detailsList.mediaDetails.name ||
                  props.detailsList.mediaDetails.title}
              </h3>
              <BookmarkButton
                isAlreadyExists={isFavourite}
                mediaDetails={props.detailsList.mediaDetails}
                bookmarkedList={props.bookMarkedList.data}
                handleFavorites={handleFavorites}
              />
            </span>
            <section className="summary-section">
              <h4 className="summary-title">Summary:</h4>
              <p className="summary-content">
                {props.detailsList.mediaDetails.overview}
              </p>
            </section>
            <section className="movie-stats-section">
              <section className="movie-release-date">
                <p>Release Date</p>
                <p>{props.detailsList.mediaDetails.release_date}</p>
              </section>
              <section className="movie-voting-average">
                <p>Voting Average</p>
                <p
                  className={`tag ${voteRating(
                    props.detailsList.mediaDetails.vote_average
                  )}`}
                >
                  {props.detailsList.mediaDetails.vote_average}
                </p>
              </section>
              <section className="movie-trailer">
                <YouTubeButton
                  video_id={video}
                  text="Watch The Trailer"
                  linkAvailability={linkAvailability}
                />
              </section>
            </section>
          </div>
        </div>
        <div className="carouselSection">
          <button className="go-back-button" onClick={() => history.goBack()}>
            <i className="fas fa-angle-left"></i>
          </button>
          <h3>Cast Details:</h3>
          <span>Main Cast</span>
          {props.creditsList.creditsArray.cast && (
            <Carousel list={props.creditsList.creditsArray.cast} />
          )}
          {message && <Snackbar message={message} time={500} />}
        </div>
      </div>
      {props.bookMarkedList.loading && <Spinner />}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    detailsList: state.detailsList,
    bookMarkedList: state.bookMarkedList,
    creditsList: state.creditsList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: (mediaType, mediaID) => {
      dispatch(fetchDetails(mediaType, mediaID));
    },
    fetchBookmarked: () => dispatch(fetchBookmarked()),
    fetchCredit: (mediaType, mediaID) => {
      dispatch(fetchCredit(mediaType, mediaID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
