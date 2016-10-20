import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from 'client/components/App';
import ChartsPage from 'client/routes/charts';
import ArtistDetailsPage from 'client/routes/artist';
import TrackDetailsPage from 'client/routes/track';
import SearchResultsPage from 'client/routes/search/components/SearchResults';
import NotFound from 'client/components/NotFound';
// import LikesContainer from '../views/likes/components/LikesPage';
import { DEFAULT_GENRE } from 'client/constants/SongConstants';
import { loadCharts } from 'client/redux/modules/charts';
import { fetchArtistAndTracks } from 'client/redux/modules/artist';
import { loadTrackPage } from 'client/redux/modules/track';
import { sagaSearch } from 'client/redux/modules/search';

const configureRoutes = (store) => {
  const onEnterCharts = (nextState) => {
    const dispatch = store.dispatch;
    const genre = nextState.params.genre || DEFAULT_GENRE;
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
        <IndexRedirect to={`top50/${DEFAULT_GENRE}`} />
        <Route path="top50" component={ChartsPage}>
          <IndexRedirect to={`${DEFAULT_GENRE}`} />
          <Route path=":genre" component={ChartsPage} onEnter={onEnterCharts} />
        </Route>
        <Route path="artist" >
          <Route path=":uid" component={ArtistDetailsPage} onEnter={onArtistDetailsPageEnter} />
        </Route>
        <Route path="track">
          <Route path=":trackId" component={TrackDetailsPage} onEnter={onTrackDetailsPageEnter} />
        </Route>
        <Route path="search" component={SearchResultsPage} onEnter={onSearchPageEnter} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
