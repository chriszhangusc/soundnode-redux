import * as types from 'features/modals/root/rootModalActionTypes';
import { createReducer } from 'common/utils/reducerUtils';

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

export function hideModal() {
  return {
    ...initialState,
  };
}

export default createReducer(initialState, {
  [types.MODAL_SHOW]: showModal,
  [types.MODAL_HIDE]: hideModal,
});
