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
  GET_ADGROUPS,
  GET_ADGROUPS_SUCCESS,
  GET_ADGROUPS_FAIL,
  GET_CAMPAIGNS,
  GET_CAMPAIGNS_FAIL,
  GET_CAMPAIGNS_SUCCESS,
  GET_REPORT_GROUPS,
  GET_REPORT_GROUPS_SUCCESS,
  GET_REPORT_GROUPS_FAIL,
  GET_PARTICULAR_REPORT,
  GET_PARTICULAR_REPORT_SUCCESS,
  GET_PARTICULAR_REPORT_FAIL,
  SET_NOTIFICATION,
} from "../actions/types";

const INITIAL_STATE = {
  projects: [],
  selectedProjectId: null,
  projectParams: null,
  projectParamsLoading: false,
  projectParamsError: null,
  projectParamsMessage: null,
  allAds: [],
  allAdsLoading: false,
  allAdsError: null,
  adgroups: [],
  adgroupsLoading: false,
  adgroupsError: null,
  campaigns: [],
  campaignsLoading: false,
  campaignsError: null,
  reportGroups: [],
  reportGroupsLoading: false,
  reportGroupsError: null,
  particularReport: [],
  particularReportLoading: false,
  particularReportError: null,
  selectedParticularReportId: null,
  notificationType: null,
  notificationMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ITEM:
      return { ...state, [action.payload.prop]: action.payload.value };
    case SET_NOTIFICATION:
      return {
        ...state,
        notificationType: action.payload.type,
        notificationMessage: action.payload.message,
        notificationId: Math.random(),
      };
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
        projectParamsMessage: null,
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
      return { ...state, allAdsLoading: true, allAds: [], allAdsError: null };
    case GET_ALL_ADS_SUCCESS:
      return {
        ...state,
        allAds: action.payload,
        allAdsLoading: false,
      };
    case GET_ALL_ADS_FAIL:
      return {
        ...state,
        allAdsError: action.payload,
        allAdsLoading: false,
      };
    case GET_ADGROUPS:
      return {
        ...state,
        adgroupsLoading: true,
        adgroups: [],
        adgroupsError: null,
      };
    case GET_ADGROUPS_SUCCESS:
      return {
        ...state,
        adgroups: action.payload,
        adgroupsLoading: false,
      };
    case GET_ADGROUPS_FAIL:
      return {
        ...state,
        adgroupsError: action.payload,
        adgroupsLoading: false,
      };
    case GET_CAMPAIGNS:
      return {
        ...state,
        campaignsLoading: true,
        campaigns: [],
        campaignsError: null,
      };
    case GET_CAMPAIGNS_SUCCESS:
      return { ...state, campaigns: action.payload, campaignsLoading: false };
    case GET_CAMPAIGNS_FAIL:
      return {
        ...state,
        campaignsError: action.payload,
        campaignsLoading: false,
      };
    case RUN_RULES:
      return { ...state };
    case RUN_RULES_SUCCESS:
      return { ...state };
    case RUN_RULES_FAIL:
      return { ...state };
    case GET_REPORT_GROUPS:
      return {
        ...state,
        reportGroupsLoading: true,
        reportGroupsError: null,
        particularReport: [],
        particularReportError: null,
      };
    case GET_REPORT_GROUPS_SUCCESS:
      return {
        ...state,
        reportGroups: action.payload,
        reportGroupsLoading: false,
      };
    case GET_REPORT_GROUPS_FAIL:
      return {
        ...state,
        reportGroupsError: action.payload,
        reportGroupsLoading: false,
      };
    case GET_PARTICULAR_REPORT:
      return {
        ...state,
        particularReportLoading: true,
        particularReportError: null,
      };
    case GET_PARTICULAR_REPORT_SUCCESS:
      return {
        ...state,
        particularReportLoading: false,
        particularReport: action.payload,
      };
    case GET_PARTICULAR_REPORT_FAIL:
      return {
        ...state,
        particularReportError: action.payload,
        particularReportLoading: false,
      };
    case LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
