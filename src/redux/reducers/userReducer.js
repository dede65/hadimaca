import * as actionTypes from "../actions/actionTypes";

const initialState = {
  error: null,
  astropitches: null,
  isFetching: null,
  addFavoritesError: null,
  favoriteAstropitches: null,
  getFavoritesError: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.GET_ALL_ASTROPITCHES_SUCCESS:
      return {
        ...state,
        astropitches: action.astropitches,
        isFetching: false
      };
    case actionTypes.GET_ALL_ASTROPITCHES_ERROR:
      return {
        ...state,
        error: action.error
      };

    case actionTypes.ADD_TO_FAVORITES_SUCCESS:
      console.log("in userreducer: favorite astropitch add");
      return {
        ...state,
        isFavorite: true
      };
    case actionTypes.ADD_TO_FAVORITES_ERROR:
      return {
        ...state,
        addFavoritesError: action.error
      };
    case actionTypes.GET_FAVORITES_SUCCESS:
      return {
        ...state,
        favoriteAstropitches: action.favorites
      };
    case actionTypes.GET_FAVORITES_ERROR:
      return {
        ...state,
        getFavoritesError: action.error
      };
    case actionTypes.REMOVE_FROM_FAVORITES_SUCCESS:
      return {
        ...state,
        favoriteAstropitches: action.favoriteAstropitches
      };

    default:
      return state;
  }
};

export default userReducer;
