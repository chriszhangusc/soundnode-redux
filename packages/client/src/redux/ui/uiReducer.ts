import { combineReducers } from 'redux';
import navProgressReducer from './navProgress/reducer';

export default combineReducers({
  navProgress: navProgressReducer,
});
