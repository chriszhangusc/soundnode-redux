// Merge two arrays and return a new merged array without duplications
export function mergeArrays(arr1, arr2) {
  return Array.from(new Set([...arr1, ...arr2]));
}

export function mergeObjects(prevArray, newArray, by) {
  return newArray.reduce(
    (acc, item) => {
      const exists = acc.find(element => by(element) === by(item));
      
      return exists ? acc : [...acc, item];
    },
    [...prevArray],
  );
}
