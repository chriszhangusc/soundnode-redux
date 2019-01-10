const axios = require('axios');
const { BASE_V2 } = require('../consts');

/**
 * Get track by id
 * @param {Number} trackId
 */
function getTrackById(trackId, clientId) {
  return axios
    .get(`${BASE_V2}/tracks/${trackId}?client_id=${clientId}`)
    .then(response => response.data);
}

module.exports = {
  getTrackById,
};
