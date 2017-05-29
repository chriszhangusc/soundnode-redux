import copy from 'copy-to-clipboard';
import {
  notificationCopySuccess,
  notificationCopyFailed,
} from 'client/features/notification/notificationActions';

export function copyToClipboard(str) {
  return (dispatch) => {
    if (!str) {
      dispatch(notificationCopyFailed());
    } else {
      copy(str);
      dispatch(notificationCopySuccess());
    }
  };
}
