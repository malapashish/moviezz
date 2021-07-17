import db from "../utilities/firebase";

export const addBookmarked = (mediaInput) => {
  return db.collection("favorites").add({
    movieId: mediaInput.id,
    title: mediaInput.title || mediaInput.name,
    vote_average: mediaInput.vote_average,
    image_path: mediaInput.poster_path,
    mediaType: mediaInput.mediaType,
  });
};
