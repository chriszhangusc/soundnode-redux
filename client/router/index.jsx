import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from 'client/components/App';
import ChartsPage from 'client/routes/charts';
import ArtistDetailsPage from 'client/routes/artist';
import TrackDetailsPage from 'client/routes/track';
import SearchResultsPage from 'client/routes/search/components/SearchResults';
import LikesPage from 'client/routes/likes';
import NotFound from 'client/components/NotFound';
import { loadCharts, DEFAULT_GENRE } from 'client/redux/modules/charts';
import { loadArtistPage, clearArtistState } from 'client/redux/modules/artist';
import { loadTrackPage, clearTrackState } from 'client/redux/modules/track';
import { sagaSearch } from 'client/redux/modules/search';
import { clearVisibleTracks } from 'client/redux/modules/ui';
import { fetchAllLikedTracks } from 'client/redux/modules/user';

const configureRoutes = (store) => {
  // Move these hooks into seperate files
  const onChartsPageEnter = (nextState) => {
    const { dispatch } = store;
    const genre = nextState.params.genre || DEFAULT_GENRE;
    dispatch(loadCharts(genre));
  };

  const onChartsPageLeave = () => {
    console.log('onChartsPageLeave');
    const { dispatch } = store;
    dispatch(clearVisibleTracks());
  };

  const onArtistDetailsPageEnter = (nextState) => {
    const dispatch = store.dispatch;
    const uid = nextState.params.uid;
    dispatch(loadArtistPage(uid));
  };

  const onArtistDetailsPageLeave = () => {
    const { dispatch } = store;
    dispatch(clearArtistState());
  };

  const onTrackDetailsPageEnter = (nextState) => {
    const dispatch = store.dispatch;
    const trackId = nextState.params.trackId;
    dispatch(clearVisibleTracks());
    dispatch(loadTrackPage(trackId));
  };

  const onTrackDetailsPageLeave = () => {
    // Clear state info before leaving the page
    // console.log('onLeave');
    const { dispatch } = store;
    dispatch(clearTrackState());
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
          <Route
            path=":genre"
            component={ChartsPage}
            onEnter={onChartsPageEnter}
            onLeave={onChartsPageLeave}
          />
        </Route>
        <Route path="artist" >
          <Route
            path=":uid"
            component={ArtistDetailsPage}
            onEnter={onArtistDetailsPageEnter}
            onLeave={onArtistDetailsPageLeave}
          />
        </Route>
        <Route path="track">
          <Route
            path=":trackId"
            component={TrackDetailsPage}
            onEnter={onTrackDetailsPageEnter}
            onLeave={onTrackDetailsPageLeave}
          />
        </Route>
        <Route path="search" component={SearchResultsPage} onEnter={onSearchPageEnter} />
        <Route path="likes" component={LikesPage} onEnter={onLikesPageEnter} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
