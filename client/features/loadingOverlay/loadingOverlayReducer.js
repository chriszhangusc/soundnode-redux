import { createReducer } from 'common/utils/reducerUtils';
import { LOADING_OVERLAY_SHOW, LOADING_OVERLAY_HIDE } from './loadingOverlayActionTypes';

const initialState = {
  active: false,
  text: '',
};

function showLoadingOverlay(state, { text }) {
  return {
    ...state,
    active: true,
    text,
  };
}

function hideLoadingOverlay(state) {
  return {
    ...state,
    active: false,
    text: '',
  };
}

export default createReducer(initialState, {
  [LOADING_OVERLAY_SHOW]: showLoadingOverlay,
  [LOADING_OVERLAY_HIDE]: hideLoadingOverlay,
});
