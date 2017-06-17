import * as TYPES from './notificationConsts';

export function hideNotification() {
  return { type: TYPES.NOTIFICATION_HIDE };
}

export function createNotificationWarning(message) {
  return {
    type: TYPES.NOTIFICATION_WARNING_CREATE,
    payload: message,
  };
}

export function createNotificationSuccess(message) {
  return {
    type: TYPES.NOTIFICATION_SUCCESS_CREATE,
    payload: message,
  };
}

export function notificationSuccess(message) {
  return (dispatch) => {
    const createNotification = () => {
      dispatch(createNotificationSuccess(message));
    };

    const clearNotification = () => {
      dispatch(hideNotification());
    };

    setTimeout(createNotification, 200);
    setTimeout(clearNotification, 5000);
  };
}

export function notificationWarning(message) {
  return (dispatch) => {
    const createNotification = () => {
      dispatch(createNotificationWarning(message));
    };
    const clearNotification = () => {
      dispatch(hideNotification());
    };

    setTimeout(createNotification, 200);
    setTimeout(clearNotification, 5000);
  };
}
