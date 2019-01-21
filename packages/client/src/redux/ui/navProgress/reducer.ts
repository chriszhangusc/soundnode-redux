import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import { NAV_PROGRESS_LOADER_START, NAV_PROGRESS_LOADER_STOP } from './actionTypes';

const initialState = {
  loading: false,
};

function startLoading(state) {
  return {
    ...state,
    loading: true,
  };
}

function stopLoading(state) {
  return {
    ...state,
    loading: false,
  };
}

export default createReducer(initialState, {
  [NAV_PROGRESS_LOADER_START]: startLoading,
  [NAV_PROGRESS_LOADER_STOP]: stopLoading,
});
