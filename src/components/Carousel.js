import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

require("dotenv").config();

const Carousel = ({ list }) => {
  const handleDragStart = (e) => e.preventDefault();

  const responsive = {
    0: {
      items: 3,
    },
    512: {
      items: 5,
    },
    1024: {
      items: 7,
    },
  };

  const carouselList = list
    .filter((c) => c.profile_path !== null)
    .map((c) => (
      <div className="carouselDiv">
        <img
          src={
            c.profile_path
              ? `https://image.tmdb.org/t/p/w200/${c.profile_path}`
              : "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTTOkHm3_mPQ5PPRvGtU6Si7FJg8DVDtZ47rw&usqp=CAU"
          }
          alt={c.name}
          onDragStart={handleDragStart}
          className="carouselImg"
        />
        <span className="carousel-name">{c.name}</span>
      </div>
    ));

  return (
    <>
      {carouselList.length < 2 ? (
        <div className="alert">
          <span>Cast Details are not available</span>
        </div>
      ) : (
        <>
          <AliceCarousel
            mouseTracking
            infinite
            disableDotsControls
            disableButtonsControls
            responsive={responsive}
            items={carouselList}
            autoPlay
          />
        </>
      )}
    </>
  );
};

export default Carousel;
