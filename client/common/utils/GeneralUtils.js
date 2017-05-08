export function pickRandomProperty(obj) {
  var result;
  var count = 0;
  for (var prop in obj)
    if (Math.random() < 1 / ++count)
      result = prop;
  return result;
}

/**
 * Generate random integer between from and to, all inclusive
 * @param  {Number} from Lower bound
 * @param  {Number} to   Upperbound
 * @return {Number}      Result number
 */
export function generateRandom(from, to) {
  return Math.floor(Math.random() * to) + from;
}
