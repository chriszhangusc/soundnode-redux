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

export function notificationRequireLogin() {
  return dispatch =>
    dispatch(notificationWarning('Please signin to your SoundCloud account first'));
}

export function notificationLoginSuccess() {
  return dispatch => dispatch(notificationSuccess('Login success'));
}

export function notificationLoginFailed() {
  return dispatch => dispatch(notificationWarning('Login failed'));
}

export function notificationLikeSuccess() {
  return dispatch => dispatch(notificationSuccess('Song added to your favorites'));
}

export function notificationLikeFailed() {
  return dispatch => dispatch(notificationWarning('Failed to like the song'));
}

export function notificationDislikeSuccess() {
  return dispatch => dispatch(notificationSuccess('Song removed from your favorites'));
}

export function notificationDislikeFailed() {
  return dispatch => dispatch(notificationWarning('Failed to remove the song from your favorites'));
}

export function notificationCopySuccess() {
  return dispatch => dispatch(notificationSuccess('Copied to clipboard'));
}

export function notificationCopyFailed() {
  return dispatch => dispatch(notificationWarning('Failed to copy to clipboard'));
}
