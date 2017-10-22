// TODO: https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680#35641680
import React from 'react';
import { connect } from 'react-redux';

// These are regular React components we will write soon
import AddToPlaylistModal from 'features/modals/addToPlaylist/AddToPlaylistModal';

const MODAL_COMPONENTS = {
  ADD_TO_PLAYLIST: AddToPlaylistModal,
  /* other modals */
};

const ModalRoot = ({ modalType, modalProps }) => {
  if (!modalType) {
    return null;
  }

  const SpecificModal = MODAL_COMPONENTS[modalType];
  return <SpecificModal {...modalProps} />;
};

function mapStateToProps(state) {
  return {
    modalType: state.modals.modalType,
    modalProps: state.modals.modalProps,
  };
}

export default connect(mapStateToProps)(ModalRoot);
