import axios from 'axios';

import reactotron from 'reactotron-react-native';
import {
  CLEAR_STORE,
  REGISTER_ERROR,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  USER_LOGIN_FAIL,
  USER_LOGIN_REQUEST,
  USER_LOGIN_SUCCESS,
} from '../constants/Constants';
import Toast from 'react-native-simple-toast';
import {RNToasty} from 'react-native-toasty';

// export const loginUser = (data,navigation) => async dispatch => {
//     dispatch({type: USER_LOGIN_REQUEST});
//   try {

//     const res = await axios.post(
//       'https://ibf.instantbusinesslistings.com/public/api/login',
//       data,
//     );

//     dispatch({type: USER_LOGIN_SUCCESS, payload: res});
//     RNToasty.Success({
//       title: res?.data?.message,
//       position: 'bottom',
//     });

//     reactotron.log("res==========>",res)

//     if(res?.data?.user?.role === 'admin'){
//       navigation.navigate('DashboardAdmin')
//     }else {
//       navigation.navigate('UserNavigator')
//     }

//   } catch (error) {

//     reactotron.log('error--->>>>>DATA', error);
//     dispatch({type: USER_LOGIN_FAIL});
//     RNToasty.Error({
//       title: "User has not been approved. Please contact an administrator.",
//       position: 'bottom',
//     });
//   }
// };

export const loginUser = (data, navigation) => async dispatch => {
  dispatch({type: USER_LOGIN_REQUEST});
  try {
    const res = await axios.post(
      'https://ibf.instantbusinesslistings.com/public/api/login',
      data,
    );
    dispatch({type: USER_LOGIN_SUCCESS, payload: res});
    RNToasty.Success({
      title: res?.data?.message,
      position: 'bottom',
    });

    reactotron.log('res==========>', res);

    if (res?.data?.user?.role === 'admin') {
      navigation.navigate('DashboardAdmin');
    } else {
      navigation.navigate('UserNavigator');
    }
  } catch (error) {
    dispatch({type: USER_LOGIN_FAIL});
    RNToasty.Error({
      title: error.response.data.error_message,
      position: 'bottom',
    });
  }
};

export const userLogout = data => async dispatch => {
  dispatch({type: CLEAR_STORE, payload: null});
};

export const registerUser = (data, navigation) => async dispatch => {
  dispatch({type: REGISTER_REQUEST});
  try {
    const res = await axios.post(
      'https://ibf.instantbusinesslistings.com/public/api/register',
      data,
    );

    dispatch({type: REGISTER_SUCCESS, payload: res});

    RNToasty.Success({
      title: res?.data?.message,
      position: 'bottom',
    });

    // navigation.navigate('Login');
    navigation.navigate('Login');
  } catch (error) {
    reactotron.log('EROORRO', error.response.data.error);

    // if (
    //   error.response.data.errors.email[0] ||
    //   error.response.data.errors.mobile_no[0]
    // )
    dispatch({type: REGISTER_ERROR, payload: error});
    RNToasty.Error({
      title: error.response.data.error,
      position: 'bottom',
    });

    RNToasty.Error({
      title: error.response.data.errors.email[0],
      position: 'bottom',
    });
    RNToasty.Error({
      title: error.response.data.errors.mobile_no[0],
      position: 'bottom',
    });
  }
};
