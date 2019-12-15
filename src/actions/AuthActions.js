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
} from "./types";
import urls from "../urls";

export const setItem = (prop, value) => dispatch => {
  dispatch({ type: SET_ITEM, payload: { prop, value } });
};

export const loginUser = (email, password) => dispatch => {
  dispatch({ type: LOG_IN });
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  axios
    .post(urls.session, formData)
    .then(response => {
      dispatch({ type: LOG_IN_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({
        type: LOG_IN_FAIL,
        payload: error.response.data.status.statusMessage,
      });
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOG_OUT });
};

export const forgotPassword = email => dispatch => {
  dispatch({ type: FORGOT_PASSWORD });
  const formData = new FormData();
  formData.append("email", email);
  axios
    .post(urls.password, formData)
    .then(response => {
      dispatch({ type: FORGOT_SUCCESS, payload: response.data.message });
    })
    .catch(error => {
      dispatch({ type: FORGOT_FAIL, payload: null });
      console.log(error);
    });
};

export const signUp = (name, email, password) => dispatch => {
  dispatch({ type: SIGN_UP });
  const formData = new FormData();
  formData.append("name", name);
  formData.append("email", email);
  formData.append("password", password);
  axios
    .post(urls.registration, formData)
    .then(response => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: response.data.message });
    })
    .catch(error => {
      dispatch({
        type: SIGN_UP_FAIL,
        payload: error.response.data.status.statusMessage,
      });
      console.log(error.response);
    });
};
