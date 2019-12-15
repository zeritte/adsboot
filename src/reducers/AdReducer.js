import {
  GET_ALL_ADS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = { adsDataTable: [] };

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_ADS_SUCCESS:
      return { ...state, adsDataTable: action.payload };
    default:
      return state;
  }
};
