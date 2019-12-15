import axios from "axios";
import { GET_ALL_ADS, GET_ALL_ADS_FAIL, GET_ALL_ADS_SUCCESS } from "./types";
import urls from "../urls";

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
