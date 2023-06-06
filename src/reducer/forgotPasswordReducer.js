import {
  CLEAR_STORE,
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
} from '../constants/Constants';

export const forgotPasswordReducer = (
  state = {
    loading: false,
    forgotRes: {},
    error: null,
  },
  {payload, type},
) => {
  switch (type) {
    case FORGOT_PASSWORD_REQUEST:
      return {...state, loading: true};
    case FORGOT_PASSWORD_SUCCESS:
      return {...state, loading: false, forgotRes: payload};
    case FORGOT_PASSWORD_ERROR:
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
