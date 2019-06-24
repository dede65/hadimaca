import firebase from "react-native-firebase";
import * as actionTypes from "./actionTypes";


// logout user
export const logoutAction = () => {
  return async dispatch => {
    try {
      await firebase.auth().signOut();
      console.log("In logoutAction: Logout success");
      dispatch({ type: actionTypes.USER_LOGOUT_SUCCESS });
    } catch (error) {}
  };
};

export const resetPassword = emailAddress => {
  return async (dispatch, getState) => {
    try {
      await firebase.auth().sendPasswordResetEmail(emailAddress);
      dispatch({ type: actionTypes.RESET_PASSWORD_SUCCESS });
    } catch (error) {
      console.log("reset password error", error.message);

      //alert(error.message)

      dispatch({
        type: actionTypes.RESET_PASSWORD_ERROR,
        error: error.message
      });
    }
  };
};
