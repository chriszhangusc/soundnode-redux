import * as types from 'features/modals/modalsActionTypes';
import addToPlaylistReducer from 'features/modals/addToPlaylist/addToPlaylistReducer';

const initialState = {
  modalType: null,
  modalProps: {},
  ADD_TO_PLAYLIST: addToPlaylistReducer,
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
