import * as TYPES from './notificationConsts';

/* Reducer */
const initialState = {
  hidden: true,
  type: '',
  message: '',
};

export default function notificationReducer(state = initialState, action) {
  if (action.error) {
    return {
      ...state,
      hidden: false,
      type: 'warning',
      message: 'Something is wrong',
    };
  }

  switch (action.type) {
    case TYPES.NOTIFICATION_HIDE:
      return {
        ...state,
        hidden: true,
      };

    case TYPES.NOTIFICATION_SUCCESS_CREATE:
      return {
        ...state,
        hidden: false,
        type: 'success',
        message: action.payload,
      };

    case TYPES.NOTIFICATION_WARNING_CREATE:
      return {
        ...state,
        hidden: false,
        type: 'warning',
        message: action.payload,
      };

    default:
      return state;
  }
}
