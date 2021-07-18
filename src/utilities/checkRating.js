//checks the rating of the movie and returns class which indicates that rating is low or high
export const checkRating = (rating) => {
  if (rating > 7) {
    return "primary";
  } else if (rating < 6) {
    return "secondary";
  } else {
    return "error";
  }
};

export const voteRating = (rating) => {
  if (rating > 8) {
    return "green";
  } else if (rating > 6) {
    return "orange";
  } else {
    return "red";
  }
};
