const trackApi = require('@soundnode-redux/server/src/common/soundcloud/v1/track');

async function getTrackById(trackId) {
  return trackApi.getTrackById(trackId);
}

module.exports = {
  getTrackById,
};
