import concat from 'lodash/concat';

// Shift an element to the head of the array, if element is not in the array
// eslint-disable-next-line
export function shiftToFront(arr, target) {
  if (!arr.indexOf(target)) return arr;
  return concat(target, arr.filter(x => x !== target));
}
