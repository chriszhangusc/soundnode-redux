import { fromJS } from 'immutable';

export const setLastVolume = (volume) => {
  localStorage.setItem('lastVolume', JSON.stringify(volume));
};

export const getLastVolume = () => JSON.parse(localStorage.getItem('lastVolume'));

// Currently we are persisting everything in the store, will change this to improve preformance.
export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    // console.log('load state', serializedState);
    // console.log(JSON.parse(serializedState));
    if (serializedState === null) {
      return undefined;
    }
    // console.log(serializedState);
    return fromJS(JSON.parse(serializedState));
  } catch (err) {
    console.log(err);
    return undefined; // Return undefined so that our reducer initialize with default state.
  }
};

// Only store player state and auth state, no fetched playlists
export const saveState = (state, keys) => {
  try {
    // console.log('before:', state);
    const sliceOfState = {};
    keys.forEach((key) => {
      if (state.get(key)) {
        sliceOfState[key] = state.get(key).toJS();
      }
    });
    const serializedState = JSON.stringify(sliceOfState);
    // console.log('after:', serializedState);
    // const serializedState = JSON.stringify(state.toJS());
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
