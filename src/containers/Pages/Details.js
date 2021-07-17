import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Button } from "@material-ui/core";
import YouTubeIcon from "@material-ui/icons/YouTube";
import BookmarkOutlinedIcon from "@material-ui/icons/BookmarkOutlined";
import BookmarkBorderIcon from "@material-ui/icons/BookmarkBorder";
import { checkRating } from "../../utilities/checkRating";
import { movieDbAPI, imgAPI } from "../../apis";
import Snackbar from "../../components/LikeMessages";
import Carousel from "../../components/Carousel";
import { Spinner } from "../../components/Spinner";

import { addBookmarked } from "../../firebase/addBookmarked";
import { deleteBookmarked } from "../../firebase/deleteBookmarked";

/*Redux imports*/
import { connect } from "react-redux";
import { fetchDetails } from "../../actions/detailsAction";
import { fetchBookmarked } from "../../actions/fetchbookmarkedAction";

require("dotenv").config();

const MovieDetails = (props) => {
  const id = props.match.params.id;

  const history = useHistory();

  const [video, setVideo] = useState();
  const [linkAvailability, setLinkAvailability] = useState(false);
  const [credits, setCredits] = useState([]);
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
    console.log(props);

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

    const getCredits = async () => {
      await movieDbAPI
        .get(
          `/${mediaType}/${mediaID}/credits?api_key=${process.env.REACT_APP_API_KEY}&language=en-US`
        )
        .then((response) => {
          setCredits(response.data.cast);
        });
    };
    getCredits();

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

  const handleFavorites = () => {
    if (
      props.bookMarkedList.data.some(
        (content) =>
          content.title ===
          (props.detailsList.mediaDetails.title ||
            props.detailsList.mediaDetails.name)
      )
    ) {
      const newArray = props.bookMarkedList.data.filter(
        (movie) =>
          movie.title ===
          (props.detailsList.mediaDetails.name ||
            props.detailsList.mediaDetails.title)
      );
      deleteBookmarked(newArray[0].id).then(() => {
        setIsFavourite(!isFavourite);
        props.fetchBookmarked();
        setMessage("Removed from favourites");
      });
    } else {
      addBookmarked({ ...props.detailsList.mediaDetails, mediaType }).then(
        () => {
          setIsFavourite(!isFavourite);
          props.fetchBookmarked();
          setMessage("Added to favourites");
        }
      );
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
              {isFavourite ? (
                <button
                  className="favourites-button"
                  onClick={() => handleFavorites(id)}
                >
                  <BookmarkOutlinedIcon fontSize="large" />
                </button>
              ) : (
                <button
                  className="favourites-button"
                  onClick={() => handleFavorites()}
                >
                  <BookmarkBorderIcon fontSize="large" />
                </button>
              )}
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
                  className={`tag ${checkRating(
                    props.detailsList.mediaDetails.vote_average
                  )}`}
                >
                  {props.detailsList.mediaDetails.vote_average}
                </p>
              </section>
              <section className="movie-trailer">
                {linkAvailability ? (
                  <Button
                    variant="contained"
                    startIcon={<YouTubeIcon />}
                    color="secondary"
                    target="__blank"
                    href={`https://www.youtube.com/watch?v=${video}`}
                  >
                    Watch the Trailer
                  </Button>
                ) : (
                  ""
                )}
              </section>
            </section>
          </div>
        </div>
        <div className="carouselSection">
          <button className="go-back-button" onClick={() => history.goBack()}>
            <i class="fas fa-angle-left"></i>
          </button>
          <h3>Cast Details:</h3>
          <span>Main Cast</span>
          <Carousel list={credits} />
          <div className="complete-crew-section">
            <Link to={"/details/" + id + "/cast"} className="cast-list-link">
              Full Crew and Cast Members
            </Link>
          </div>
        </div>
      </div>
      {message && <Snackbar message={message} time={500} />}
      {props.bookMarkedList.loading ? <Spinner /> : ""}
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    detailsList: state.detailsList,
    bookMarkedList: state.bookMarkedList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDetails: (mediaType, mediaID) => {
      dispatch(fetchDetails(mediaType, mediaID));
    },
    fetchBookmarked: () => dispatch(fetchBookmarked()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(MovieDetails);
