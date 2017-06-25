// Merge two arrays and return a new merged array without duplications
export function mergeArrays(arr1, arr2) {
  return [...new Set([...arr1, ...arr2])];
}
