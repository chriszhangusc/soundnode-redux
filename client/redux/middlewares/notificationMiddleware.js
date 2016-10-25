import { NotificationManager } from 'react-notifications';

const SUCCESS = 'Success';
const ERROR = 'Error';

const notificationMiddleware = () => next => (action) => {
  const { type } = action;
  if (!type) return next(action);
  if (type.indexOf('SUCCESS') > -1) {
    NotificationManager.success(action.payload.message, SUCCESS);
  } else if (type.indexOf('FAILED') > -1 || type.indexOf('FAILURE') > -1) {
    // Need to display error message.
    NotificationManager.error('An unknown error has occurred...', ERROR);
  }
  return next(action);
};

export default notificationMiddleware;
