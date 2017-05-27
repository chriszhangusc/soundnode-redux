export const getState = state => state.notification;
export const isNotificationHidden = state => getState(state).hidden;
export const getNotificationType = state => getState(state).type;
export const getNotificationMessage = state => getState(state).message;
