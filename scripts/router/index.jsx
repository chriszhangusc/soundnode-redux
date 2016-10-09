import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from 'client/components/App';
import TopMusicPage from 'client/routes/top50';
import ArtistDetailsPage from 'client/routes/artist';
import TrackDetailsPage from 'client/routes/track';
import NotFound from 'client/components/NotFound';
// import LikesContainer from '../views/likes/components/LikesPage';
import { DEFAULT_GENRE } from 'client/constants/SongConstants';
import { loadCharts } from 'client/modules/charts/actions/chartsActions';

const configureRoutes = (store) => {
  const onEnterCharts = (nextState) => {
    const dispatch = store.dispatch;
    const genre = nextState.params.genre || DEFAULT_GENRE;
    dispatch(loadCharts(genre));
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`top50/${DEFAULT_GENRE}`} />
        <Route path="top50" component={TopMusicPage}>
          <IndexRedirect to={`${DEFAULT_GENRE}`} />
          <Route path=":genre" component={TopMusicPage} onEnter={onEnterCharts} />
        </Route>
        <Route path="artist/:uid" component={ArtistDetailsPage} />
        <Route path="track/:trackId" component={TrackDetailsPage} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
