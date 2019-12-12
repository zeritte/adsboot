import {
  SET_ITEM,
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  LOG_OUT,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
} from "./types";

export const setItem = (prop, value) => dispatch => {
  dispatch({ type: SET_ITEM, payload: { prop, value } });
};


