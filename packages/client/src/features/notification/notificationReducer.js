import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import * as types from './notificationActionTypes';

/* Reducer */
const initialState = {
  notifications: [],
};

export function addNotification(state, { notification }) {
  return {
    ...state,
    // Add new notification to the front
    notifications: [notification, ...state.notifications],
  };
}

export function removeNotification(state, { id }) {
  return {
    ...state,
    notifications: state.notifications.filter(item => item.id !== id),
  };
}

export default createReducer(initialState, {
  [types.NOTIFICATION_ADD]: addNotification,
  [types.NOTIFICATION_REMOVE]: removeNotification,
});
