import { MODAL_SHOW, MODAL_HIDE } from 'features/modals/modalsActionTypes';

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
