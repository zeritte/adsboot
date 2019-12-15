import {
  GET_ALL_ADS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  adsDataTable: [],
  adsDataTableLoading: false,
  adsDataTableError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_ADS:
      return { ...state, adsDataTableLoading: true, adsDataTable: [] };
    case GET_ALL_ADS_SUCCESS:
      return {
        ...state,
        adsDataTable: action.payload,
        adsDataTableLoading: false,
      };
    case GET_ALL_ADS_FAIL:
      return {
        ...state,
        adsDataTableLoading: false,
        adsDataTableError: "Could not fetch the data",
      };
    default:
      return state;
  }
};
