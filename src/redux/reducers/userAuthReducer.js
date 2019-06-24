import * as actionTypes from "../actions/actionTypes";

const initialState = {
  userSignupError: null,
  userLoginError: null,
  userAuthenticated: false,
  resetPassword: null
};

const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.USER_SIGNUP_SUCCESS:
      return {
        ...state,
        userSignupError: null
      };
    case actionTypes.USER_SIGNUP_ERROR:
      return {
        ...state,
        userSignupError: action.error
      };
    case actionTypes.USER_LOGIN_SUCCESS:
      return {
        ...state,
        userLoginError: null
      };
    case actionTypes.USER_LOGIN_ERROR:
      return {
        ...state,
        userLoginError: action.error
      };
    case actionTypes.USER_IS_AUTHENTICATED:
      return {
        ...state,
        userAuthenticated: true
      };
    case actionTypes.USER_IS_NOT_AUTHENTICATED:
      return {
        ...state,
        userAuthenticated: false
      };
    case actionTypes.RESET_PASSWORD_SUCCESS:
      console.log("reset password success");
      return {
        ...state,
        resetPassword: true
      };
    case actionTypes.RESET_PASSWORD_ERROR:
      return {
        ...state,
        resetPassword: false
      };
    default:
      return state;
  }
};

export default userAuthReducer;
