export const NOTIFICATION_SUCCESS = 'redux-music/notification/SUCCESS';
export const NOTIFICATION_FAILURE = 'redux-music/notification/FAILURE';

export const notificationSuccess = message => ({
    type: NOTIFICATION_SUCCESS,
    payload: message,
});

export const notificationFailure = message => ({
    type: NOTIFICATION_FAILURE,
    payload: message,
});
