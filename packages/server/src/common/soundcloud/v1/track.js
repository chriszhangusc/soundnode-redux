const axios = require('axios');
const { camelizeKeys } = require('humps');
const { CLIENT_ID } = require('@soundnode-redux/server/src/common/env');
const { BASE_V1 } = require('../consts');

// TODO: CLIENT_ID should be passed in by the client
/**
 * Get track by id
 * @param {Number} trackId
 */
function getTrackById(trackId) {
  return axios
    .get(`${BASE_V1}/tracks/${trackId}?client_id=${CLIENT_ID}`)
    .then(response => response.data)
    .then(data => camelizeKeys(data));
}

module.exports = {
  getTrackById,
};
