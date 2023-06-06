import {
  CLEAR_STORE,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/Constants';

export const userLoginReducer = (
  state = {
    loading: false,
    data: {},
  },
  {payload, type},
) => {
  switch (type) {
    case USER_LOGIN_REQUEST:
      return {...state, loading: true};
    case USER_LOGIN_SUCCESS:
      return {...state, loading: false, data: payload};
    case USER_LOGIN_FAIL:
      return {...state, loading: false};

    case CLEAR_STORE:
      return {
        ...state,
        data: {},
      };

    default:
      return state;
  }
};
export const userRegisterReducer = (
  state = {
    loading: false,
    data: {},
    error: {},
  },
  {payload, type},
) => {
  switch (type) {
    case REGISTER_REQUEST:
      return {...state, loading: true};
    case REGISTER_SUCCESS:
      return {...state, loading: false, data: payload};
    case REGISTER_ERROR:
      return {...state, loading: false, error: payload};

    case CLEAR_STORE:
      return {
        ...state,
        data: {},
      };

    default:
      return state;
  }
};
