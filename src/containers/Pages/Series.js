import React, { useState, useEffect } from "react";
import db from "../../utilities/firebase";
import LikeMessages from "../../components/LikeMessages";
import Cards from "../../components/Cards";
import { movieDbAPI } from "../../apis";
import { useDebounce } from "../../utilities/useDebounce";
import duckSearching from "../../images/duck_searching.gif";
require("dotenv").config();

const Series = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isSearching, setIsSearching] = useState(false);
  const [seriesList, setSeriesList] = useState([]);
  const [favouriteContent, setFavouriteContent] = useState([]);
  const [repatedLiked, setRepatedLiked] = useState(null);
  const [message, setMessage] = useState(null);

  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const getSeries = async (term) => {
        await movieDbAPI
          .get(
            `search/tv?api_key=${process.env.REACT_APP_API_KEY}&language=en-US&query=${term}`
          )
          .then((response) => {
            setSeriesList(response.data.results);
            setIsSearching(false);
          });
      };
      getSeries(debouncedSearchTerm);
      setIsSearching(true);
      fetchSeriesList();
    } else {
      setSeriesList([]);
    }
  }, [debouncedSearchTerm]);

  const IMG_API = "https://images.tmdb.org/t/p/w1280";

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFavourite = (input) => {
    if (favouriteContent.some((movie) => movie.title === input.title)) {
      setRepatedLiked(true);
      setTimeout(() => {
        setRepatedLiked(null);
      }, 500);
    } else {
      db.collection("favourites").add({
        movieId: input.id,
        title: input.title || input.name,
        vote_average: input.vote_average,
        image_path: IMG_API + input.poster_path,
      });
      setMessage("Added to the favourites");
      setTimeout(() => {
        setMessage(null);
      }, 500);
    }
  };

  const fetchSeriesList = () => {
    db.collection("favourites").onSnapshot((q) => {
      setFavouriteContent(
        q.docs.map((doc) => ({
          id: doc.id,
          title: doc.data().title,
          poster_path: doc.data().image_path,
          vote_average: doc.data().vote_average,
        }))
      );
    });
  };

  return (
    <>
      <div className="wrap">
        <input
          className="search"
          type="text"
          placeholder="Enter Series name Here"
          value={searchTerm}
          onChange={handleSearchTerm}
        />
      </div>
      {isSearching && (
        <div style={{ textAlign: "center" }}>
          <img
            src={duckSearching}
            alt="Searching Gif"
            className="searching-gif"
          />
          Searching.......
        </div>
      )}
      <div className="movie-container">
        {seriesList &&
          seriesList.map((series) => (
            <Cards
              key={series.id}
              {...series}
              media_type="tv"
              handleFavourite={handleFavourite}
            />
          ))}
      </div>
      <LikeMessages message={message} />
      {repatedLiked && (
        <div className="snackbar show">Already added in the favourites..</div>
      )}
    </>
  );
};

export default Series;
