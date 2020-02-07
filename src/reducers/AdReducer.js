import {
  SET_ITEM,
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
  LOG_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  projects: [],
  selectedProjectId: null,
  adsDataTable: [],
  adsDataTableLoading: false,
  adsDataTableError: null,
  projectParams: null,
  projectParamsLoading: false,
  projectParamsError: null,
  projectParamsMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ITEM:
      return { ...state, [action.payload.prop]: action.payload.value };
    case FETCH_PROJECTS:
      return {
        ...state,
        projects: action.payload,
        selectedProjectId: action.payload[0]["projectId"],
      };
    case GET_PROJECT_PARAMS:
      return {
        ...state,
        projectParams: null,
        projectParamsError: null,
        projectParamsLoading: true,
      };
    case GET_PROJECT_PARAMS_SUCCESS:
      return {
        ...state,
        projectParams: {
          xpath: action.payload.xpath,
          message: action.payload.stockOutMessage,
        },
        projectParamsLoading: false,
      };
    case GET_PROJECT_PARAMS_FAIL:
      return {
        ...state,
        projectParamsLoading: false,
        projectParamsError: action.payload,
      };
    case UPDATE_PROJECT_PARAMS:
      return {
        ...state,
        projectParamsMessage: null,
        projectParamsLoading: true,
        projectParamsError: null,
      };
    case UPDATE_PROJECT_PARAMS_SUCCESS:
      return {
        ...state,
        projectParamsMessage: action.payload,
        projectParamsLoading: false,
      };
    case UPDATE_PROJECT_PARAMS_FAIL:
      return {
        ...state,
        projectParamsError: action.payload,
        projectParamsLoading: false,
      };
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
    case LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
