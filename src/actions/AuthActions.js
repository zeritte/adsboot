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
  // FORGOT_FAIL,
  // FORGOT_PASSWORD,
  // FORGOT_SUCCESS,
  SET_SHOULD_VISIT_TOKEN_SCREEN,
  GET_TOKENS,
  GET_TOKENS_SUCCESS,
  UPDATE_TOKENS,
  UPDATE_TOKENS_FAIL,
  UPDATE_TOKENS_SUCCESS,
  GET_TOKENS_FAIL,
} from "./types";
import urls from "../urls";
import { getProjects } from "./AdActions";
import { dataHandler, messageHandler } from "../helpers/responseHandler";

export const setItem = (prop, value) => dispatch => {
  dispatch({ type: SET_ITEM, payload: { prop, value } });
};

export const loginUser = (email, password) => dispatch => {
  dispatch({ type: LOG_IN });
  axios
    .post(urls.session, { email, password })
    .then(response => {
      dataHandler(dispatch, LOG_IN_SUCCESS, response.data);
      dispatch(setShouldVisitTokenScreen(response.data.status.code === 3000));
      dispatch(getProjects());
    })
    .catch(error => {
      messageHandler(dispatch, LOG_IN_FAIL, error.response);
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

export const signUp = (
  fname,
  lname,
  email,
  password,
  setActiveTabId,
) => dispatch => {
  dispatch({ type: SIGN_UP });
  axios
    .post(urls.registration, {
      name: fname,
      surname: lname,
      email,
      password,
    })
    .then(response => {
      messageHandler(dispatch, SIGN_UP_SUCCESS, response);
      setActiveTabId(0);
      dispatch(loginUser(email, password));
    })
    .catch(error => {
      messageHandler(dispatch, SIGN_UP_FAIL, error.response);
    });
};

export const setShouldVisitTokenScreen = bool => dispatch =>
  dispatch({ type: SET_SHOULD_VISIT_TOKEN_SCREEN, payload: bool });

export const getTokens = () => (dispatch, getState) => {
  dispatch({ type: GET_TOKENS });
  axios
    .get(urls.clientTokens, {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dataHandler(dispatch, GET_TOKENS_SUCCESS, response.data);
    })
    .catch(error => {
      messageHandler(dispatch, GET_TOKENS_FAIL, error.response);
    });
};

export const updateTokens = (
  clientId,
  clientSecret,
  refreshToken,
  developerToken,
) => (dispatch, getState) => {
  dispatch({ type: UPDATE_TOKENS });
  axios
    .post(
      urls.clientTokens,
      {
        clientId,
        clientSecret,
        refreshToken,
        developerToken,
      },
      { headers: { Authorization: getState().auth.token } },
    )
    .then(response => {
      messageHandler(dispatch, UPDATE_TOKENS_SUCCESS, response);
      dispatch(getTokens());
      dispatch(getProjects());
    })
    .catch(error => {
      messageHandler(dispatch, UPDATE_TOKENS_FAIL, error.response);
    });
};
