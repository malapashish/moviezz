import db from '../config/firebase';

export const deleteFavourite = (input) => {
        console.log(typeof input);
        db
            .collection('favorites')
            .doc(input)
            .delete()
            .then(() => {
                console.log("Successfully Deleted");
            })
            .catch((e) => {
                console.log('Error removing document' , e);
            })
    }
