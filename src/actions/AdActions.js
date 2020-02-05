import axios from "axios";
import {
  FETCH_PROJECTS,
  SELECT_PROJECT,
  GET_ALL_ADS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_SUCCESS,
  RUN_RULES,
  RUN_RULES_FAIL,
  RUN_RULES_SUCCESS,
} from "./types";
import urls from "../urls";

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

export const selectProject = id => dispatch =>
  dispatch({ type: SELECT_PROJECT, payload: id });

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
