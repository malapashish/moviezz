import db from "../utilities/firebase";

export const deleteBookmarked = (id) => {
  return db.collection("favorites").doc(id).delete();
};
