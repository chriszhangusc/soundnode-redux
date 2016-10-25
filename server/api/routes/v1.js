import express from 'express';
import fetch from 'isomorphic-fetch';
const SC_API_V1 = 'https://api.soundcloud.com';

const router = express.Router();

// Endpoints
// Fetch a single artist/user from soundcloud
// https://api.soundcloud.com/users/20665501?client_id=f9e1e2232182a46705c880554a1011af
router.get('/users/:userId', (req, res) => {
  // Url resolve will not take userId
  const clientId = encodeURIComponent(req.query.client_id);
  const fetchUrl = `${SC_API_V1}/users/${req.params.userId}?client_id=${clientId}`;
console.log(fetchUrl);
  fetch(fetchUrl)
    .then(response => response.json())
    .then((json) => {
      // Just return the artist/user object.
      res.json(json);
    });
});
// http://localhost:3000/sc/api-v1/users/20665501/tracks?limit=20&client_id=f9e1e2232182a46705c880554a1011af
router.get('/users/:userId/tracks', (req, res) => {
  const clientId = encodeURIComponent(req.query.client_id);
  const limit = encodeURIComponent(req.query.limit);
  const fetchUrl = `${SC_API_V1}/users/${req.params.userId}/tracks?linked_partitioning=1&limit=${limit}&client_id=${clientId}`;
  fetch(fetchUrl)
    .then(response => response.json())
    .then((json) => {
      const newJson = {
        collection: [],
        nextHref: json.next_href
      };
      // Iterate through the json collection, put every track into our newJson's collection
      json.collection.forEach((item) => {
        newJson.collection.push(item);
      });
      res.json(newJson);
    });
});

router.get('/artists', (req, res) => {
  const keyword = req.query.q;
  const limit = req.query.limit;
  const clientId = req.query.client_id;
  const fetchUrl = `${SC_API_V1}/users?linked_partitioning=1&limit=${limit}&q=${keyword}&client_id=${clientId}`;
  fetch(fetchUrl)
    .then(response => response.json())
    .then((json) => {
      res.json(json);
    });
});

router.get('/tracks', (req, res) => {
  const keyword = req.query.q;
  const limit = req.query.limit;
  const clientId = req.query.client_id;
  const fetchUrl = `${SC_API_V1}/tracks?linked_partitioning=1&limit=${limit}&q=${keyword}&client_id=${clientId}`;
  fetch(fetchUrl)
    .then(response => response.json())
    .then((json) => {
      res.json(json);
    });
});

// Post with post body {trackIds: [...ids]}
router.post('/tracks', (req, res) => {
  const clientId = req.query.client_id;
  const trackIds = req.body.trackIds;
  const resJson = {
    collection: [],
    nextHref: null
  };
  const fetchQueue = [];
  if (!trackIds) res.json(resJson);
console.log(trackIds);
  trackIds.forEach((trackId) => {
    const fetchUrl = `${SC_API_V1}/tracks/${trackId}?client_id=${clientId}`;
    // console.log('fetching...', fetchUrl);
    fetchQueue.push(
      fetch(fetchUrl)
      .then(response => response.json())
      .then((json) => {
        if (json.errors) console.log(json.errors);
        else resJson.collection.push(json);
      })
    );
  });
  Promise.all(fetchQueue).then(() => {
    res.json(resJson);
  });
});

// Get single track
router.get('/tracks/:trackId', (req, res) => {
  const clientId = encodeURIComponent(req.query.client_id);
  const fetchUrl = `${SC_API_V1}/tracks/${req.params.trackId}?client_id=${clientId}`;

  fetch(fetchUrl)
    .then(response => response.json())
    .then((json) => {
      // Single object from SC, just return it.
      res.json(json);
    });
});

// Get comments of a single track
router.get('/tracks/:trackId/comments', (req, res) => {
  const clientId = encodeURIComponent(req.query.client_id);
  const limit = encodeURIComponent(req.query.limit);
  const fetchUrl = `${SC_API_V1}/tracks/${req.params.trackId}/comments?\
linked_partitioning=1&limit=${limit}&client_id=${clientId}`;
  fetch(fetchUrl)
    .then(response => response.json())
    .then((json) => {
      res.json(json);
    });
});

export default router;
