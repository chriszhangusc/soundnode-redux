import { createReducer } from '@soundnode-redux/client/src/common/utils/reducerUtils';
import * as types from './sidebarActionTypes';

/* Reducer */
const initialState = {
  hidden: true,
};

function showSidebar(state) {
  return {
    ...state,
    hidden: false,
  };
}

function hideSidebar(state) {
  return {
    ...state,
    hidden: true,
  };
}

export default createReducer(initialState, {
  [types.SIDEBAR_SHOW]: showSidebar,
  [types.SIDEBAR_HIDE]: hideSidebar,
});
