import copy from 'copy-to-clipboard';
import { notificationSuccess, notificationFailure } from './notification';

export function copyToClipboard(str, successMessage) {
  return (dispatch) => {
    if (!str) {
      dispatch(notificationFailure('Failed to copy to clipboard'));
    } else {
      copy(str);
      dispatch(notificationSuccess(successMessage));
    }
  };
}
