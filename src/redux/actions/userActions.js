import firebase from "react-native-firebase";
import * as actionTypes from "./actionTypes";

export const getAstropitches = () => {
  return async (dispatch, getState) => {
    try {
      const astropitches = await firebase
        .firestore()
        .collection("astropitches")
        .get();

      dispatch({
        type: actionTypes.GET_ALL_ASTROPITCHES_SUCCESS,
        astropitches: astropitches
      });
    } catch (error) {
      dispatch({
        type: actionTypes.GET_ALL_ASTROPITCHES_ERROR,
        error: error.message
      });
    }
  };
};

export const addToFavorites = astropitch => {
  return async (dispatch, getState) => {
    try {
      let favArray = [astropitch];
      const id = firebase.auth().currentUser.uid;
      await firebase
        .firestore()
        .collection("favorites")
        .doc(id)
        .set(
          {
            favorites: firebase.firestore.FieldValue.arrayUnion(...favArray)
          },
          { merge: true }
        );
      console.log("in addToFavorites action: favorite astropitch added");
      dispatch({
        type: actionTypes.ADD_TO_FAVORITES_SUCCESS,
        astropitch: astropitch
      });
    } catch (error) {
      console.log("in addtoFavorites: error", error.message);
      dispatch({
        type: actionTypes.ADD_TO_FAVORITES_ERROR,
        error: error.message
      });
    }
  };
};

export const getFavoriteAstropitches = () => {
  return async (dispatch, getState) => {
    try {
      const id = firebase.auth().currentUser.uid;
      await firebase
        .firestore()
        .collection("favorites")
        .doc(id)
        .onSnapshot(querySnapshot => {
          const favorites = [];
          console.log("querySnapshot", querySnapshot._data.favorites);
          querySnapshot._data.favorites.forEach(doc => {
            favorites.push(doc);
            dispatch({
              type: actionTypes.GET_FAVORITES_SUCCESS,
              favorites: favorites
            });
          });
        });
    } catch (error) {
      dispatch({ type: actionTypes.GET_FAVORITES_ERROR, error: error.message });
    }
  };
};

export const removeFromFavorites = id => {
  return async dispatch => {
    try {
      console.log("Removing from favorites starts");
      const docId = firebase.auth().currentUser.uid;
      const astropitches = await firebase
        .firestore()
        .collection("favorites")
        .doc(docId)
        .get();
      console.log("retrieving astropitches from firebase:", astropitches);

      const filteredAstropitches = astropitches._data.favorites.filter(
        astropitch => astropitch.id != id
      );

      await firebase
        .firestore()
        .collection("favorites")
        .doc(docId)
        .update({
          favorites: filteredAstropitches
        });

      dispatch({
        type: actionTypes.REMOVE_FROM_FAVORITES_SUCCESS,
        favoriteAstropitches: filteredAstropitches
      });
    } catch (error) {
      dispatch({
        type: actionTypes.REMOVE_FROM_FAVORITES_ERROR,
        error: error.message
      });
    }
  };
};
