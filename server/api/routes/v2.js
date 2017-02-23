var express = require('express');
// import express from 'express';
// import fetch from 'isomorphic-fetch';
var fetch = require('isomorphic-fetch');
// import url from 'url';
var url = require('url');

const SC_API_V2 = 'https://api-v2.soundcloud.com/';

const router = express.Router();

function convertTrackToV1(trackV2) {
  return Object.assign({}, trackV2, {
    stream_url: `${trackV2.uri}/stream`,
    favoritings_count: trackV2.likes_count
  });
}

// Endpoints
// http://localhost:3001/sc/api-v2/charts?kind=top&genre=soundcloud:genres:country&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
router.get('/charts', (req, res) => {
  let fetchUrl = url.resolve(SC_API_V2, 'charts');
  const kind = encodeURIComponent(req.query.kind);
  const genre = encodeURIComponent(req.query.genre);
  const limit = encodeURIComponent(req.query.limit);
  const offset = encodeURIComponent(req.query.offset);
  const clientId = encodeURIComponent(req.query.client_id);

  fetchUrl = `${fetchUrl}?kind=${kind}&genre=${genre}\
&linked_partitioning=1&limit=${limit}\
&offset=${offset}&client_id=${clientId}`;
  fetch(fetchUrl)
    .then(response => response.json())
    .then((json) => {
      const newJson = {
        collection: [],
        nextHref: json.next_href
      };

      // Iterate through the json collection, put every track into our newJson's collection
      json.collection.forEach((item) => {
        const { track } = item;
        // Tracks coming back from v2 is different from v1, convert it to v1.
        newJson.collection.push(convertTrackToV1(track));
      });

      res.json(newJson);
    });
});

// export default router;
module.exports = router;
