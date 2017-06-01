import * as TYPES from './notificationConsts';

export function showNotification() {
  return { type: TYPES.NOTIFICATION_SHOW };
}

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

export function clearNotificationState() {
  return {
    type: TYPES.NOTIFICATION_STATE_CLEAR,
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


// Move these to the relating domains
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
