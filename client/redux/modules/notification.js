export const NOTIFICATION_SUCCESS = 'redux-music/notification/SUCCESS';
export const NOTIFICATION_FAILURE = 'redux-music/notification/FAILURE';

export function notificationSuccess(message) {
  return {
    type: NOTIFICATION_SUCCESS,
    payload: message,
  };
}

export function notificationFailure(message) {
  return {
    type: NOTIFICATION_FAILURE,
    payload: message,
  };
}
