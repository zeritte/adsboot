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
import { urls } from "../urls";

export const setItem = (prop, value) => dispatch => {
  dispatch({ type: SET_ITEM, payload: { prop, value } });
};

export const loginUser = (email, password) => dispatch => {
  dispatch({ type: LOG_IN });
  axios
    .post(urls.session, { email, password })
    .then(response => {
      dispatch({ type: LOG_IN_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({
        type: LOG_IN_FAIL,
        payload: null,
      });
      console.log(error);
    });
};

export const logoutUser = () => dispatch => {
  dispatch({ type: LOG_OUT });
};

export const forgotPassword = email => dispatch => {
  dispatch({ type: FORGOT_PASSWORD });
  axios
    .post(urls.password, { email })
    .then(response => {
      dispatch({ type: FORGOT_SUCCESS, payload: response.data.message });
    })
    .catch(error => {
      dispatch({ type: FORGOT_FAIL, payload: null });
      console.log(error);
    });
};

export const signUp = user => dispatch => {
  dispatch({ type: SIGN_UP });
  axios
    .post(urls.registration, {
      user,
    })
    .then(response => {
      dispatch({ type: SIGN_UP_SUCCESS, payload: response.data.message });
    })
    .catch(error => {
      dispatch({ type: SIGN_UP_FAIL, payload: null });
      console.log(error);
    });
};
