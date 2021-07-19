import React from "react";
import { Badge } from "@material-ui/core";

const IMG_API = "https://images.tmdb.org/t/p/w1280";

const FavoritesCards = ({ deleteHandler, bookMarkedList }) => {
  return (
    <>
      {bookMarkedList &&
        bookMarkedList.map((favouriteMedia) => (
          <div className="favourites-card-container">
            <Badge
              badgeContent={
                <i
                  className={`delete_icon`}
                  onClick={() => deleteHandler(favouriteMedia.id)}
                />
              }
            >
              <img
                src={
                  favouriteMedia.poster_path
                    ? IMG_API + favouriteMedia.poster_path
                    : "https://images.unsplash.com/photo-1509281373149-e957c6296406?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=369&q=80"
                }
                alt={favouriteMedia.title + " poster image"}
                className="favourites-backdrop-image"
              />
            </Badge>
          </div>
        ))}
    </>
  );
};

export default FavoritesCards;
