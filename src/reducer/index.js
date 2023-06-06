import {combineReducers} from 'redux';
import {userLoginReducer, userRegisterReducer} from './UserReducer';
import {forgotPasswordReducer} from './forgotPasswordReducer';

export const rootReducer = combineReducers({
  user: userLoginReducer,
  userRegister: userRegisterReducer,
  forgotPassword: forgotPasswordReducer,
});
