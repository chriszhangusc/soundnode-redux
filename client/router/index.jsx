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
import { sagaSearch, clearSearchPageResults } from 'client/redux/modules/search';
import { clearVisibleTracks } from 'client/redux/modules/ui';
import { fetchAllLikedTracks } from 'client/redux/modules/user';
import { GENRES } from 'client/constants/ChartsConsts';

const configureRoutes = (store) => {
  // Move these hooks into seperate files
  const onChartsPageEnter = (nextState, replace) => {
      const { dispatch } = store;
      const genreFromUrl = nextState.params.genre;
      const valid = GENRES.filter(item => item.link.indexOf(genreFromUrl) > -1).length > 0;

      // Handle routes that are partially matched but containing
       // invalid genre like this: http://localhost:3000/top50/All-Music/adfasdfasdfasdf
      const genre = valid ? genreFromUrl : DEFAULT_GENRE;
      if (!valid) replace(`/charts/${DEFAULT_GENRE}`);
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
      const { dispatch } = store;
      dispatch(clearTrackState());
  };

  const onSearchPageEnter = (nextState) => {
      console.log('On search page enter');
      const dispatch = store.dispatch;
      // Clear previous results first.
      const query = nextState.location.query;
      dispatch(sagaSearch(query.q, 20));
  };

  const onSearchPageLeave = () => {
    console.log('On Search Page Leave');
    const { dispatch } = store;
    dispatch(clearSearchPageResults());
  };

  const onLikesPageEnter = () => {
    const { dispatch } = store;
    dispatch(fetchAllLikedTracks());
  };

  return (
      <Router history={browserHistory}>
          <Route path="/" component={App}>
              <IndexRedirect to={`/charts/${DEFAULT_GENRE}`} />
              <Route path="charts" component={ChartsPage}>
                  <IndexRedirect to={`${DEFAULT_GENRE}`} />
                  <Route path=":genre" component={ChartsPage} onEnter={onChartsPageEnter} onLeave={onChartsPageLeave}/>
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
