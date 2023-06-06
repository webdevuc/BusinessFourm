import axios from 'axios';

import reactotron from 'reactotron-react-native';
import {
  FORGOT_PASSWORD_ERROR,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/Constants';

import {RNToasty} from 'react-native-toasty';

export const forgotPassword = (mobile_no, setIsOpt) => async dispatch => {
  dispatch({type: FORGOT_PASSWORD_REQUEST});
  try {
    const res = await axios.post(
      'https://ibf.instantbusinesslistings.com/api/forgot-password',
      {mobile_no: mobile_no},
    );
    reactotron.log('data--', res.data.message);
    dispatch({type: FORGOT_PASSWORD_SUCCESS, payload: res});

    if (res.data.message == 'Given Mobile Number was invalid') {
      RNToasty.Error({
        title: res.data.message,
        position: 'bottom',
      });
    } else {
      setIsOpt(true);
      RNToasty.Success({
        title: res.data.message,
        position: 'bottom',
      });
    }
  } catch (error) {
    dispatch({type: FORGOT_PASSWORD_ERROR, payload: error});
    RNToasty.Error({
      title: error.response.data,
      position: 'bottom',
    });
  }
};
