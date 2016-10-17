import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from 'client/components/App';
import TopMusicPage from 'client/routes/top50';
import ArtistDetailsPage from 'client/routes/artist';
import TrackDetailsPage from 'client/routes/track';
import SearchResultsPage from 'client/routes/search/components/SearchResults';
import NotFound from 'client/components/NotFound';
// import LikesContainer from '../views/likes/components/LikesPage';
import { DEFAULT_GENRE } from 'client/constants/SongConstants';
import { loadCharts } from 'client/modules/charts/actions/chartsActions';
import { fetchArtistAndTracks } from 'client/modules/artist/actions';
import { loadTrackPage } from 'client/modules/track/actions/track';
import { sagaSearch } from 'client/modules/search/actions';

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
        <Route path="top50" component={TopMusicPage}>
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
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
