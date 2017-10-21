import { RESET_ERROR_MESSAGE } from './errorsActionTypes';

export default function errorsReducer(state = null, action) {
  const { type, error } = action;
  if (type === RESET_ERROR_MESSAGE) {
    return null;
  } else if (error) {
    return error;
  }
  return state;
}
