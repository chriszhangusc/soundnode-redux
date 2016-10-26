import express from 'express';
import qs from 'querystring';
import { fetchCharts } from '../../../api/sc/v2';
// import { fetchArtist } from '../../../api/sc/v1';
// The reason why we use a proxy server is that soundcloud api v2 is not public yet

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
  fetchCharts(genre, limit, offset, clientId).then((charts) => {
    // res.json(charts);
    // Here we need to simplify results coming back from soundcloud server
    // to keep only collection and next_href that we care about
    const { collection, next_href } = charts;
    const nextOffset = qs.parse(next_href).offset;

    const resJson = {
      collection: [],
      // nextHref: null
      nextOffset
    };
    if (collection) {
      // const fetchQueue = [];
      collection.forEach((item) => {
        const { track } = item;
        // const { user_id } = track;
        // fetchQueue.push(fetchArtist(user_id));
        // console.log(fetchQueue);
        resJson.collection.push(convertTrackToV1(track));
      });
      res.json(resJson);
    } else {
      res.json(resJson);
    }
  });
});

export default router;
