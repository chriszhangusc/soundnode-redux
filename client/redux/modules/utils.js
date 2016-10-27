import copy from 'copy-to-clipboard';

const COPY_SUCCESS = 'COPY_SUCCESS';

export const copyToClipboard = (str) => {
  return (dispatch) => {
    copy(str);
    dispatch({
      type: COPY_SUCCESS,
      payload: {
        message: 'Track URL copied to clipboard',
      },
    });
  };
};
