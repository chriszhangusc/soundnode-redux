import copy from 'copy-to-clipboard';
import { notificationSuccess, notificationFailure } from './notification';

export function copyToClipboard(str, successMessage = 'Copy Success!') {
  return (dispatch) => {
    if (!str) {
      dispatch(notificationFailure('String is empty'));
    } else {
      copy(str);
      dispatch(notificationSuccess(successMessage));
    }
  };
}
