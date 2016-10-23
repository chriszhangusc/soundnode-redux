import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from 'client/components/App';
import ChartsPage from 'client/routes/charts';
import ArtistDetailsPage from 'client/routes/artist';
import TrackDetailsPage from 'client/routes/track';
import SearchResultsPage from 'client/routes/search/components/SearchResults';
import LikesPage from 'client/routes/likes';
import NotFound from 'client/components/NotFound';
// import LikesContainer from '../views/likes/components/LikesPage';
import { DEFAULT_GENRE } from 'client/constants/SongConstants';
import { loadCharts } from 'client/redux/modules/charts';
import { fetchArtistAndTracks } from 'client/redux/modules/artist';
import { loadTrackPage } from 'client/redux/modules/track';
import { sagaSearch } from 'client/redux/modules/search';
import { clearVisibleTracks } from 'client/redux/modules/ui';
import { fetchAllLikedTracks } from 'client/redux/modules/user';

const configureRoutes = (store) => {

  const onChartsPageEnter = (nextState) => {
    const dispatch = store.dispatch;
    const genre = nextState.params.genre || DEFAULT_GENRE;
    dispatch(clearVisibleTracks());
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
    dispatch(clearVisibleTracks());
    dispatch(loadTrackPage(trackId));
  };

  const onSearchPageEnter = (nextState) => {
    console.log('On Search Page Enter');
    const dispatch = store.dispatch;
    const query = nextState.location.query;
    dispatch(sagaSearch(query.q, 20));
  };

  const onLikesPageEnter = () => {
    const { dispatch } = store;
    dispatch(fetchAllLikedTracks());
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`top50/${DEFAULT_GENRE}`} />
        <Route path="top50" component={ChartsPage}>
          <IndexRedirect to={`${DEFAULT_GENRE}`} />
          <Route path=":genre" component={ChartsPage} onEnter={onChartsPageEnter} />
        </Route>
        <Route path="artist" >
          <Route path=":uid" component={ArtistDetailsPage} onEnter={onArtistDetailsPageEnter} />
        </Route>
        <Route path="track">
          <Route path=":trackId" component={TrackDetailsPage} onEnter={onTrackDetailsPageEnter} />
        </Route>
        <Route path="search" component={SearchResultsPage} onEnter={onSearchPageEnter} />
        {<Route path="likes" component={LikesPage} onEnter={onLikesPageEnter} />}
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
