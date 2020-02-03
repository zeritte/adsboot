import axios from "axios";
import {
  SET_ITEM,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  FORGOT_FAIL,
  FORGOT_PASSWORD,
  FORGOT_SUCCESS,
  SET_SHOULD_VISIT_TOKEN_SCREEN,
} from "./types";
import urls from "../urls";

export const setItem = (prop, value) => dispatch => {
  dispatch({ type: SET_ITEM, payload: { prop, value } });
};

export const loginUser = (email, password) => dispatch => {
  dispatch({ type: LOG_IN });
  axios
    .post(urls.session, { email, password })
    .then(response => {
      dispatch({ type: LOG_IN_SUCCESS, payload: response.data });
      dispatch(setShouldVisitTokenScreen(response.data.status.code === 3000));
    })
    .catch(error => {
      dispatch({
        type: LOG_IN_FAIL,
        payload: error.response.data.status.message,
      });
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOG_OUT });
};

// export const forgotPassword = email => dispatch => {
//   dispatch({ type: FORGOT_PASSWORD });
//   const formData = new FormData();
//   formData.append("email", email);
//   axios
//     .post(urls.password, formData)
//     .then(response => {
//       dispatch({ type: FORGOT_SUCCESS, payload: response.data.message });
//     })
//     .catch(error => {
//       dispatch({ type: FORGOT_FAIL, payload: null });
//       console.log(error);
//     });
// };

export const signUp = (fname, lname, email, password) => dispatch => {
  dispatch({ type: SIGN_UP });
  axios
    .post(urls.registration, { name: fname, surname: lname, email, password })
    .then(response => {
      dispatch({
        type: SIGN_UP_SUCCESS,
        payload: response.data.status.message,
      });
      dispatch(loginUser(email, password));
    })
    .catch(error => {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: error.response.data.status.message,
      });
    });
};

export const setShouldVisitTokenScreen = bool => dispatch =>
  dispatch({ type: SET_SHOULD_VISIT_TOKEN_SCREEN, payload: bool });
