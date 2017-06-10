import copy from 'copy-to-clipboard';
import {
  notificationSuccess,
  notificationWarning,
} from 'client/features/notification/notificationActions';

const defaultSuccessMessage = 'Successfully copied to clipboard';
const defaultFailureMessage = 'Failed to copy to clipboard';

export function copyToClipboard(
  str,
  successMessage = defaultSuccessMessage,
  failureMessage = defaultFailureMessage,
) {
  return (dispatch) => {
    if (!str) {
      dispatch(notificationWarning(failureMessage));
    } else {
      copy(str);
      dispatch(notificationSuccess(successMessage));
    }
  };
}
