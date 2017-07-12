import * as TYPES from './notificationActionTypes';

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

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case TYPES.NOTIFICATION_ADD:
      return addNotification(state, action.payload);
    case TYPES.NOTIFICATION_REMOVE:
      return removeNotification(state, action.payload);
    default:
      return state;
  }
}
