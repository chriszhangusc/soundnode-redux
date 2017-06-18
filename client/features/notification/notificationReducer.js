import * as TYPES from './notificationConsts';

/* Reducer */
const initialState = {
  notifications: [
    // Fake datas
    // { id: 0, type: 'success', title: 'Success', message: 'Login Success' },
    // { id: 1, type: 'warning', title: 'Warning', message: 'Login Failed' },
    // { id: 2, type: 'info', title: 'Info', message: 'This is an info' },
  ],
};

function addNotification(state, { notification }) {
  return {
    ...state,
    // Add new notification to the front
    notifications: [notification, ...state.notifications],
  };
}

function removeNotification(state, { id }) {
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
