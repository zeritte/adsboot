import {
  LOG_IN,
  LOG_IN_SUCCESS,
  LOG_IN_FAIL,
  SIGN_UP,
  SIGN_UP_SUCCESS,
  SIGN_UP_FAIL,
  FORGOT_SUCCESS,
  FORGOT_PASSWORD,
  FORGOT_FAIL,
  SET_ITEM,
  SET_SHOULD_VISIT_TOKEN_SCREEN,
  LOG_OUT,
  GET_TOKENS,
  GET_TOKENS_FAIL,
  GET_TOKENS_SUCCESS,
  UPDATE_TOKENS,
  UPDATE_TOKENS_SUCCESS,
  UPDATE_TOKENS_FAIL,
} from "../actions/types";

const INITIAL_STATE = {
  token: null,
  shouldVisitTokenScreen: false,
  firstname: null,
  lastname: null,
  loginLoading: false,
  loginError: null,
  signUpLoading: false,
  signUpMessage: null,
  signUpError: null,
  forgotLoading: false,
  forgotMessage: null,
  forgotError: null,
  clientTokens: null,
  clientTokensLoading: false,
  clientTokensError: null,
  clientTokensMessage: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ITEM:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOG_IN:
      return {
        ...state,
        token: null,
        firstname: null,
        lastname: null,
        loginLoading: true,
        loginError: null,
        shouldVisitTokenScreen: false,
      };
    case LOG_IN_SUCCESS:
      return {
        ...state,
        loginLoading: false,
        firstname: action.payload.name,
        lastname: action.payload.surname,
        token: `Bearer ${action.payload.jwt}`,
      };
    case LOG_IN_FAIL:
      return { ...state, loginLoading: false, loginError: action.payload };
    case SIGN_UP:
      return { ...state, signUpLoading: true, signUpError: null };
    case SIGN_UP_SUCCESS:
      return { ...state, signUpMessage: action.payload, signUpLoading: false };
    case SIGN_UP_FAIL:
      return { ...state, signUpLoading: false, signUpError: action.payload };
    case FORGOT_PASSWORD:
      return { ...state, forgotLoading: true, forgotError: null };
    case FORGOT_SUCCESS:
      return { ...state, forgotLoading: false, forgotMessage: action.payload };
    case FORGOT_FAIL:
      return { ...state, forgotLoading: false, forgotError: action.payload };
    case SET_SHOULD_VISIT_TOKEN_SCREEN:
      return { ...state, shouldVisitTokenScreen: action.payload };
    case GET_TOKENS:
      return {
        ...state,
        clientTokens: null,
        clientTokensError: null,
        clientTokensLoading: true,
      };
    case GET_TOKENS_SUCCESS:
      return {
        ...state,
        clientTokens: {
          clientId: action.payload.clientId,
          clientSecret: action.payload.clientSecret,
          developerToken: action.payload.developerToken,
          refreshToken: action.payload.refreshToken,
        },
        clientTokensLoading: false,
      };
    case GET_TOKENS_FAIL:
      return {
        ...state,
        clientTokensLoading: false,
        clientTokensError: action.payload,
      };
    case UPDATE_TOKENS:
      return {
        ...state,
        clientTokensMessage: null,
        clientTokensLoading: true,
        clientTokensError: null,
      };
    case UPDATE_TOKENS_SUCCESS:
      return {
        ...state,
        clientTokensMessage: action.payload,
        clientTokensLoading: false,
      };
    case UPDATE_TOKENS_FAIL:
      return {
        ...state,
        clientTokensError: action.payload,
        clientTokensLoading: false,
      };
    case LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};
