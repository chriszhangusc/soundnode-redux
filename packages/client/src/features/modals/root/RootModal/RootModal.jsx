// TODO: https://stackoverflow.com/questions/35623656/how-can-i-display-a-modal-dialog-in-redux-that-performs-asynchronous-actions/35641680#35641680
import React from 'react';
import { connect } from 'react-redux';
import { getModalProps, getModalType } from '@soundnode-redux/client/src/features/modals/root/rootModalSelectors';
import { hideModal } from '@soundnode-redux/client/src/features/modals/root/rootModalActions';
// These are regular React components we will write soon
import AddToPlaylistModal from '@soundnode-redux/client/src/features/modals/addToPlaylist/AddToPlaylistModal';
import ModalOverlay from '@soundnode-redux/client/src/features/modals/root/ModalOverlay';

const modalComponents = {
  ADD_TO_PLAYLIST: AddToPlaylistModal,
  /* other modals */
};

const RootModal = (props) => {
  const { modalType, modalProps } = props;
  const SpecificModal = modalType && modalComponents[modalType];
  return (
    <div>
      <ModalOverlay active={modalType} onClick={props.hideModal} />
      {SpecificModal && <SpecificModal {...modalProps} />}
    </div>
  );
};

function mapStateToProps(state) {
  return {
    modalType: getModalType(state),
    modalProps: getModalProps(state),
  };
}

export default connect(mapStateToProps, { hideModal })(RootModal);
