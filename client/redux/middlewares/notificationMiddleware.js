import { NotificationManager } from 'react-notifications';

const SUCCESS = 'Success';
const ERROR = 'Error';

const notificationMiddleware = () => next => (action) => {
  if (!action.type) return next(action);
  if (action.type.indexOf('SUCCESS') > -1) {
    // console.log(action.type);
    NotificationManager.success(action.payload.message, SUCCESS);
  } else if (action.type.indexOf('FAILED') > -1) {
    // console.log(action.type);
    NotificationManager.error(action.payload.message, ERROR);
  }
  return next(action);
};

export default notificationMiddleware;
