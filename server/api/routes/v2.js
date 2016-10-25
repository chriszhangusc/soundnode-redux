import express from 'express';
import fetch from 'isomorphic-fetch';
import url from 'url';
import { fetchCharts } from '../../../api/sc/v2';
import { fetchArtist } from '../../../api/sc/v1';
const SC_API_V2 = 'https://api-v2.soundcloud.com/';

const router = express.Router();

function convertTrackToV1(trackV2) {
  return Object.assign({}, trackV2, {
    stream_url: `${trackV2.uri}/stream`,
    favoritings_count: trackV2.likes_count
  });
}

// Endpoints
// The request from browser looks like this:
// http://localhost:3001/sc/api-v2/charts?genre=all-music&limit=20&offset=0&client_id=02gUJC0hH2ct1EGOcYXQIzRFU91c72Ea
router.get('/charts', (req, res) => {
  const genre = req.query.genre;
  const limit = req.query.limit;
  const offset = req.query.offset;
  const clientId = req.query.client_id;

  // The downside of fetching detailed artists: SLOW!!
  fetchCharts(genre, limit, offset, clientId).then(charts => {
    // res.json(charts);
    // Here we need to simplify results coming back from soundcloud server
    // to keep only collection and next_href that we care about
    const { collection, next_href } = charts;
    const resJson = {
      collection: [],
      nextHref: null
    };

    if (collection) {
      const fetchQueue = [];
      collection.forEach(item => {
        const { track } = item;
        const { user_id } = track;
        fetchQueue.push(fetchArtist(user_id));
        // console.log(fetchQueue);
        resJson.collection.push(convertTrackToV1(track));
      });
      // The order of the promise array is preserved
      Promise.all(fetchQueue).then(artists => {
        artists.forEach((artist, i) => resJson.collection[i].user = artist);
        res.json(resJson);
      });
    } else {
      res.json(resJson);
    }
  });
  // fetch(fetchUrl)
  //   .then(response => response.json())
  //   .then((json) => {
  //     const newJson = {
  //       collection: [],
  //       nextHref: json.next_href
  //     };
  //     // For each track, go fetch their user.
  //     json.collection.forEach((item) => {
  //       const { track } = item;
  //       const { user_id } = track;
  //       // Fetch user
  //       // fetch(`http://localhost:3001/sc/api-v1/users/${user_id}?client_id=${clientId}`).then(response => response.json).then((userJson) => {
  //       //   console.log(userJson.id);
  //       // });
  //       // Tracks coming back from v2 is different from v1, convert it to v1.
  //       newJson.collection.push(convertTrackToV1(track));
  //     });
  //
  //     res.json(newJson);
  //   });
});

export default router;
