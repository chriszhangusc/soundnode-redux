import * as types from 'features/modals/root/rootModalActionTypes';

const initialState = {
  modalType: null,
  modalProps: {},
};

function showModal(state, action) {
  const { modalType, modalProps } = action.payload;
  return {
    ...state,
    modalType,
    modalProps: {
      ...modalProps,
    },
  };
}

export default function rootModalReducer(state = initialState, action) {
  switch (action.type) {
    case types.MODAL_SHOW:
      return showModal(state, action);

    case types.MODAL_HIDE:
      return initialState;

    default:
      return state;
  }
}
