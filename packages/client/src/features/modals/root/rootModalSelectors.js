import { createSelector } from 'reselect';

export const getState = state => state.modals.root;

export const getModalType = createSelector(getState, state => state.modalType);
export const getModalProps = createSelector(getState, state => state.modalProps);
