import React from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { checkRating } from "../utilities/checkRating";
const IMG_API = "https://images.tmdb.org/t/p/w300";
require("dotenv").config();

const Cards = ({ contentArray }) => { 
  return (
    <>
      {contentArray &&
        contentArray.map((media) => (
          <div className="card-container" key={media.id}>
            <Badge
              badgeContent={media.vote_average} 
              className = {`${checkRating(media.vote_average)}`}
            >
              <Link to={`/details/${media.id + "_" + media.media_type}`}>
                <img
                  src={
                    media.poster_path
                      ? IMG_API + media.poster_path
                      : "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80"
                  }
                  alt={media.title + " poster image"}
                  className="backdrop-image"
                />
              </Link>
            </Badge>
          </div>
        ))}
    </>
  );
};

export default Cards;
