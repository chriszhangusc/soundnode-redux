import * as types from '@soundnode-redux/client/src/features/modals/root/rootModalActionTypes';
import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';

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

export function hideModal() {
  return {
    ...initialState,
  };
}

export default createReducer(initialState, {
  [types.MODAL_SHOW]: showModal,
  [types.MODAL_HIDE]: hideModal,
});
