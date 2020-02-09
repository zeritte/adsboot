import axios from "axios";
import {
  FETCH_PROJECTS,
  GET_ALL_ADS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_SUCCESS,
  GET_ADGROUPS,
  GET_ADGROUPS_FAIL,
  GET_ADGROUPS_SUCCESS,
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_FAIL,
  GET_CAMPAIGNS_SUCCESS,
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
import { dataHandler, messageHandler } from "../helpers/responseHandler";

export const getProjects = () => (dispatch, getState) => {
  axios
    .get(urls.projects, {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dataHandler(dispatch, FETCH_PROJECTS, response.data);
    })
    .catch(error => {
      // TODO: implement error message
      //messageHandler(dispatch, "FETCH_PROJECTS_FAIL", error.response)
      console.log(error.response);
    });
};

export const selectProject = id => dispatch => {
  dispatch(setItem("selectedProjectId", id));
  dispatch(getProjectParams());
};

export const getProjectParams = () => (dispatch, getState) => {
  if (!getState().ad.selectedProjectId) {
    messageHandler(
      dispatch,
      GET_PROJECT_PARAMS_FAIL,
      "Please wait till your projects are fetched",
    );
    return;
  }
  dispatch({ type: GET_PROJECT_PARAMS });
  axios
    .get(urls.projectParams(getState().ad.selectedProjectId), {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dataHandler(dispatch, GET_PROJECT_PARAMS_SUCCESS, response.data);
    })
    .catch(error => {
      messageHandler(dispatch, GET_PROJECT_PARAMS_FAIL, error.response);
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
      messageHandler(dispatch, UPDATE_PROJECT_PARAMS_SUCCESS, response);
    })
    .catch(error => {
      messageHandler(dispatch, UPDATE_PROJECT_PARAMS_FAIL, error.response);
    });
};

export const getAllAds = () => (dispatch, getState) => {
  dispatch({ type: GET_ALL_ADS });
  axios
    .get(urls.allAds(getState().ad.selectedProjectId), {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dataHandler(dispatch, GET_ALL_ADS_SUCCESS, response.data);
    })
    .catch(error => {
      messageHandler(dispatch, GET_ALL_ADS_FAIL, "Could not fetch the data");
    });
};

export const getAdgroups = () => (dispatch, getState) => {
  dispatch({ type: GET_ADGROUPS });
  axios
    .get(urls.adgroups(getState().ad.selectedProjectId), {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dataHandler(dispatch, GET_ADGROUPS_SUCCESS, response.data);
    })
    .catch(error => {
      messageHandler(dispatch, GET_ADGROUPS_FAIL, "Could not fetch the data");
    });
};

export const getCampaigns = () => (dispatch, getState) => {
  dispatch({ type: GET_CAMPAIGNS });
  axios
    .get(urls.campaigns(getState().ad.selectedProjectId), {
      headers: { Authorization: getState().auth.token },
    })
    .then(response => {
      dataHandler(dispatch, GET_CAMPAIGNS_SUCCESS, response.data);
    })
    .catch(error => {
      messageHandler(dispatch, GET_CAMPAIGNS_FAIL, "Could not fetch the data");
    });
};

export const runRules = selectedAdIds => dispatch => {
  console.log("runrules");
  // dispatch({ type: RUN_RULES });
  // axios
  //   .post(urls.runRules, { selectedAdIds })
  //   .then(response => {
  //     dataHandler(dispatch, RUN_RULES_SUCCESS, response);
  //   })
  //   .catch(error => {
  //     messageHandler(dispatch, RUN_RULES_FAIL, "Could not send the data");
  //   });
};
