import { NotificationManager } from 'react-notifications';

const SUCCESS = 'Success';
const ERROR = 'Error';

export default function () {
  return next => (action) => {
    if (action.type.indexOf('SUCCESS') > -1) {
      console.log(action.type);
      NotificationManager.success(action.payload.message, SUCCESS);
    } else if (action.type.indexOf('FAILED') > -1) {
      console.log(action.type);
      NotificationManager.error(action.payload.message, ERROR);
    }
    next(action);
  };
}
