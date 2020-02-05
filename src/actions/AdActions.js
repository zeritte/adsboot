import axios from "axios";
import {
  FETCH_PROJECTS,
  GET_ALL_ADS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_SUCCESS,
  RUN_RULES,
  RUN_RULES_FAIL,
  RUN_RULES_SUCCESS,
  GET_PROJECT_PARAMS,
  GET_PROJECT_PARAMS_SUCCESS,
  GET_PROJECT_PARAMS_FAIL,
  UPDATE_PROJECT_PARAMS,
  UPDATE_PROJECT_PARAMS_SUCCESS,
  UPDATE_PROJECT_PARAMS_FAIL,
} from "./types";
import urls from "../urls";
import { setItem } from "./AuthActions";

export const getProjects = () => (dispatch, getState) => {
  axios
    .get(urls.projects, {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dispatch({ type: FETCH_PROJECTS, payload: response.data.data });
    })
    .catch(error => {
      // TODO: implement error message
      console.log(error.response);
    });
};

export const selectProject = id => dispatch => {
  dispatch(setItem("selectedProjectId", id));
  dispatch(getProjectParams());
};

export const getProjectParams = () => (dispatch, getState) => {
  dispatch({ type: GET_PROJECT_PARAMS });
  axios
    .get(urls.projectParams(getState().ad.selectedProjectId), {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dispatch({
        type: GET_PROJECT_PARAMS_SUCCESS,
        payload: response.data.data,
      });
    })
    .catch(error => {
      dispatch({
        type: GET_PROJECT_PARAMS_FAIL,
        payload: error.response.data.status.message,
      });
    });
};

export const updateProjectParams = (stockOutMessage, xpath) => (
  dispatch,
  getState,
) => {
  dispatch({ type: UPDATE_PROJECT_PARAMS });
  axios
    .post(
      urls.projectParams(getState().ad.selectedProjectId),
      {
        stockOutMessage,
        xpath,
      },
      { headers: { Authorization: getState().auth.token } },
    )
    .then(response => {
      dispatch({
        type: UPDATE_PROJECT_PARAMS_SUCCESS,
        payload: response.data.status.message,
      });
    })
    .catch(error => {
      dispatch({
        type: UPDATE_PROJECT_PARAMS_FAIL,
        payload: error.response.data.status.message,
      });
    });
};

export const getAllAds = () => dispatch => {
  dispatch({ type: GET_ALL_ADS });
  axios
    .get(urls.getAllAds)
    .then(response => {
      dispatch({ type: GET_ALL_ADS_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({
        type: GET_ALL_ADS_FAIL,
        payload: "Could not fetch the data",
      });
    });
};

export const runRules = selectedAdIds => dispatch => {
  dispatch({ type: RUN_RULES });
  axios
    .post(urls.runRules, { selectedAdIds })
    .then(response => {
      dispatch({ type: RUN_RULES_SUCCESS, payload: response.data });
    })
    .catch(error => {
      dispatch({
        type: RUN_RULES_FAIL,
        payload: "Could not send the data",
      });
    });
};
