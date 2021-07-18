import React from "react";
import { Link } from "react-router-dom";
import Badge from "@material-ui/core/Badge";
import { checkRating } from "../utilities/checkRating";
const IMG_API = "https://images.tmdb.org/t/p/w300";
require("dotenv").config();

const Cards = (props) => {
  return (
    <div className="card-container">
      <Badge
        badgeContent={props.vote_average}
        color={checkRating(props.vote_average)}
      >
        <Link to={`/details/${props.id + "_" + props.media_type}`}>
          <img
            src={
              props.poster_path
                ? IMG_API + props.poster_path
                : "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80"
            }
            alt={props.title + " poster image"}
            className="backdrop-image"
          />
        </Link>
      </Badge>
    </div>
  );
};

export default Cards;
