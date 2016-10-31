import { NotificationManager } from 'react-notifications';

export const NOTIFICATION_SUCCESS = 'redux-music/notification/SUCCESS';
export const NOTIFICATION_FAILURE = 'redux-music/notification/FAILURE';

const defaultErrorMessage = 'Action success!';
const defaultSuccessMessage = 'Action failed!';

const notificationMiddleware = () => next => (action) => {
  const { type } = action;
  if (!type) return next(action);
  switch (type) {
    case NOTIFICATION_SUCCESS:
      NotificationManager.success(action.payload || defaultSuccessMessage, 'Success');
      break;
    case NOTIFICATION_FAILURE:
      NotificationManager.error(action.payload || defaultErrorMessage, 'Error');
      break;
    default:
      break;
  }
  return next(action);
};

export default notificationMiddleware;
