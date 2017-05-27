export function toggleNotification() {
  return { type: 'NOTIFICATION_TOGGLE' };
}

export function showNotification() {
  return { type: 'NOTIFICATION_SHOW' };
}

export function hideNotification() {
  return { type: 'NOTIFICATION_HIDE' };
}

export function createNotificationWarning(message) {
  return {
    type: 'NOTIFICATION_WARNING_CREATE',
    payload: message,
  };
}


export function createNotificationSuccess(message) {
  return {
    type: 'NOTIFICATION_SUCCESS_CREATE',
    payload: message,
  };
}

export function clearNotificationState() {
  return {
    type: 'CLEAR_NOTIFICATION_STATE',
  };
}

export function notificationSuccess(message) {
  return (dispatch) => {
    dispatch(createNotificationSuccess(message));
    const clearNotification = () => {
      dispatch(hideNotification());
    };
    setTimeout(clearNotification, 5000);
  };
}

export function notificationWarning(message) {
  return (dispatch) => {
    dispatch(createNotificationWarning(message));
    const clearNotification = () => {
      dispatch(hideNotification());
    };
    setTimeout(clearNotification, 5000);
  };
}

