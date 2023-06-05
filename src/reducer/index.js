import { combineReducers } from 'redux';
import { userLoginReducer } from './UserReducer';

export const rootReducer = combineReducers({
 user:userLoginReducer
});
