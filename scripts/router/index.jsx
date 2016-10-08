import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from 'client/components/App';
import TopMusicPage from 'client/routes/top50';
import ArtistDetailsPage from 'client/routes/artist';
import NotFound from 'client/components/NotFound';
// import LikesContainer from '../views/likes/components/LikesPage';
import { DEFAULT_GENRE } from 'client/constants/SongConstants';
import { sagaLoadSongCardsPage } from 'client/modules/playlists/actions';

const configureRoutes = (store) => {
  const onEnterHandler = (nextState) => {
    // Will be called twice somehow.
    const playlist = nextState.params.genre || DEFAULT_GENRE;
    store.dispatch(sagaLoadSongCardsPage(playlist));
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`top50/${DEFAULT_GENRE}`} />
        <Route path="top50" component={TopMusicPage}>
          <IndexRedirect to={`${DEFAULT_GENRE}`} />
          <Route path=":genre" component={TopMusicPage} onEnter={onEnterHandler} />
        </Route>
        <Route path="artist/:uid" component={ArtistDetailsPage} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
