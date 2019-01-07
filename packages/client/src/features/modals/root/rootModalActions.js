import { MODAL_SHOW, MODAL_HIDE } from '@soundnode-redux/client/src/features/modals/root/rootModalActionTypes';

export function showModal(modalType, modalProps) {
  return {
    type: MODAL_SHOW,
    payload: {
      modalType,
      modalProps,
    },
  };
}

export function hideModal() {
  return {
    type: MODAL_HIDE,
  };
}
