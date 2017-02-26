import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from 'client/components/App';
import TopMusicPage from 'client/routes/charts';
import ArtistDetailsPage from 'client/routes/artist';
import TrackDetailsPage from 'client/routes/track';
import SearchResultsPage from 'client/routes/search/components/SearchResults';
import NotFound from 'client/components/NotFound';

import { GENRES, DEFAULT_GENRE } from 'client/constants/Genres';
import { loadCharts } from 'client/redux/modules/charts';
import { fetchArtistAndTracks } from 'client/redux/modules/artist';
import { loadTrackPage } from 'client/redux/modules/track';
import { sagaSearch } from 'client/redux/modules/search';

const configureRoutes = (store) => {

  const onEnterCharts = (nextState, replace) => {
    const dispatch = store.dispatch;
    const genreFromUrl = nextState.params.genre;
    const isValid = GENRES.indexOf(genreFromUrl) > -1;
    const genre = isValid ? genreFromUrl : DEFAULT_GENRE;
    // Handle routes that are partially matched but containing
    // invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
    if (!isValid) {
        replace('/charts');
    }
    dispatch(loadCharts(genre));
  };

  const onArtistDetailsPageEnter = (nextState) => {
    const dispatch = store.dispatch;
    const uid = nextState.params.uid;
    dispatch(fetchArtistAndTracks(uid));
  };

  const onTrackDetailsPageEnter = (nextState) => {
      const dispatch = store.dispatch;
      const trackId = nextState.params.trackId;
      dispatch(loadTrackPage(trackId));
  };

  const onSearchPageEnter = (nextState) => {
      const dispatch = store.dispatch;
      const query = nextState.location.query;
      dispatch(sagaSearch(query.q, 20));
  };

  return (
    <Router history={browserHistory}>
        <Route path="/" component={App}>
            <IndexRedirect to={`/charts/${DEFAULT_GENRE}`} />
            <Route path="charts" component={TopMusicPage}>
                <IndexRedirect to={`${DEFAULT_GENRE}`} />
                <Route path=":genre" component={TopMusicPage} onEnter={onEnterCharts} />
            </Route>
            <Route path="artist" >
                <Route path=":uid" component={ArtistDetailsPage} onEnter={onArtistDetailsPageEnter} />
            </Route>
            <Route path="track">
                <Route path=":trackId" component={TrackDetailsPage} onEnter={onTrackDetailsPageEnter} />
            </Route>
            <Route path="search" component={SearchResultsPage} onEnter={onSearchPageEnter} />
        </Route>
        <Route path="*">
            <IndexRedirect to={`/charts`} />
        </Route>
    </Router>
  );
};

export default configureRoutes;
