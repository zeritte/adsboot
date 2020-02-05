import {
  FETCH_PROJECTS,
  SELECT_PROJECT,
  GET_ALL_ADS,
  GET_ALL_ADS_FAIL,
  GET_ALL_ADS_SUCCESS,
  RUN_RULES,
  RUN_RULES_FAIL,
  RUN_RULES_SUCCESS,
} from "../actions/types";

const INITIAL_STATE = {
  projects: [
    { projectName: "Project 1", projectId: 11111 },
    { projectName: "Project 2", projectId: 22222 },
    { projectName: "Project 3", projectId: 33333 },
  ],
  selectedProjectId: 11111,
  adsDataTable: [],
  adsDataTableLoading: false,
  adsDataTableError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_PROJECTS:
      return { ...state, projects: action.payload };
    case SELECT_PROJECT:
      return { ...state, selectedProjectId: action.payload };
    case GET_ALL_ADS:
      return { ...state, adsDataTableLoading: true, adsDataTable: [] };
    case GET_ALL_ADS_SUCCESS:
      return {
        ...state,
        adsDataTable: [], //action.payload
        adsDataTableLoading: false,
      };
    case GET_ALL_ADS_FAIL:
      return {
        ...state,
        adsDataTableLoading: false,
        adsDataTableError: "Could not fetch the data",
      };
    case RUN_RULES:
      return { ...state };
    case RUN_RULES_FAIL:
      return { ...state };
    case RUN_RULES_SUCCESS:
      return { ...state };
    default:
      return state;
  }
};
