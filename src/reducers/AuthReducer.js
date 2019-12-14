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
  LOG_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  isLoggedIn: false,
  loginLoading: false,
  loginError: null,
  signUpLoading: false,
  signUpMessage: null,
  signUpError: null,
  forgotLoading: false,
  forgotMessage: null,
  forgotError: null,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_ITEM:
      return { ...state, [action.payload.prop]: action.payload.value };
    case LOG_IN:
      return {
        ...state,
        isLoggedIn: false,
        loginLoading: true,
        loginError: null,
      };
    case LOG_IN_SUCCESS:
      return { ...state, isLoggedIn: true, loginLoading: false };
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
    case LOG_OUT:
      return { ...INITIAL_STATE };
    default:
      return state;
  }
};
