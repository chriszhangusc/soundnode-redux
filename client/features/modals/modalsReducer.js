import * as types from 'features/modals/modalsActionTypes';

const initialState = {
  modalType: null,
  modalProps: {},
};

function showModal(state, { modalType, modalProps }) {
  return {
    ...state,
    modalType,
    modalProps: {
      ...modalProps,
    },
  };
}

export default function modalsReducer(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW:
      return showModal(state, action.payload);

    case types.MODAL_HIDE:
      return initialState;

    default:
      return state;
  }
}
