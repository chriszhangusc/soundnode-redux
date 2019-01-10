const trackRepo = require('./repository');

function getTrackById(trackId) {
  return trackRepo.getTrackById(trackId);
}

module.exports = {
  getTrackById,
};
