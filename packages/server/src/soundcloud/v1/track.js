const axios = require('axios');
const { CLIENT_ID } = require('@soundnode-redux/server/src/common/env');
const { BASE_V1 } = require('../consts');

function getTrackById(trackId) {
  console.log(`${BASE_V1}/tracks/${trackId}?client_id=${CLIENT_ID}`);

  return axios
    .get(`${BASE_V1}/tracks/${trackId}?client_id=${CLIENT_ID}`)
    .then(response => console.log(response) || response);
}

module.exports = {
  getTrackById,
};
