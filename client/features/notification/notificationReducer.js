/* Reducer */
const initialState = {
  hidden: true,
  type: '',
  message: '',
};

export default function notificationReducer(state = initialState, action) {
  switch (action.type) {
    case 'CLEAR_NOTIFICATION_STATE':
      return {
        ...initialState,
      };
    case 'NOTIFICATION_TOGGLE':
      return {
        ...state,
        hidden: !state.hidden,
      };

    case 'NOTIFICATION_SHOW':
      return {
        ...state,
        hidden: false,
      };
    case 'NOTIFICATION_HIDE':
      return {
        ...state,
        hidden: true,
      };
    case 'NOTIFICATION_SUCCESS_CREATE':
      return {
        ...state,
        hidden: false,
        type: 'success',
        message: action.payload,
      };

    case 'NOTIFICATION_WARNING_CREATE':
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
