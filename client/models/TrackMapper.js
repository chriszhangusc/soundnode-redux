// As we are getting different result object structure from SC_API_V1 and V2,
// we have to use a mapper to map object from V2 to V1
import Track from 'client/models/Track';
/**
 * Take a plain javascript object from SC_API_V2 convert and return it as a SC_API_V1 obj
 * @param {[type]} trackV2 [description]
 */
export default function trackMapper(trackV2) {
  let trackV1 = new Track(trackV2);
  const streamUrlV2 = `${trackV2.uri}/stream`;
  // Map different keys
  trackV1 = trackV1.set('stream_url', streamUrlV2);
  trackV1 = trackV1.set('favoritings_count', trackV2.likes_count);
  // console.log(trackV1.toJS());
  return trackV1;
}
