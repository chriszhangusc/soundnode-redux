import { fromJS } from 'immutable';

export const setLastVolume = (volume) => {
  localStorage.setItem('lastVolume', JSON.stringify(volume));
};

export const getLastVolume = () => {
  return JSON.parse(localStorage.getItem('lastVolume'));
};

export const loadState = () => {
  try {
    const serializedState = fromJS(localStorage.getItem('state'));
    console.log(serializedState);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined; // Return undefined so that our reducer initialize with default state.
  }
};

// Our top level state is a JS object, but its children are immutable objects.
export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
  } catch (err) {
    console.log(err);
  }
};
