import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from '../views/common/components/App';
import TopMusicPage from '../views/top50/components/TopMusicPage';
import NotFound from '../views/common/components/NotFound';
import LikesContainer from '../views/likes/components/LikesPage';

import { DEFAULT_GENRE } from '../constants/SongConstants';
import { sagaLoadSongCardsPage } from '../modules/playlists/actions';

const configureRoutes = (store) => {
  const onEnterHandler = (nextState) => {
    const playlist = nextState.params.genre || DEFAULT_GENRE;
    store.dispatch(sagaLoadSongCardsPage(playlist));
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`top50/${DEFAULT_GENRE}`} />
        <Route path="top50" component={TopMusicPage} onEnter={onEnterHandler}>
          <IndexRedirect to={`${DEFAULT_GENRE}`} />
          <Route path=":genre" component={TopMusicPage} onEnter={onEnterHandler} />
        </Route>
        <Route path="likes" component={LikesContainer} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

// <Route path="top50/(:genre)" component={TopMusicPage} onEnter={onEnterHandler} />

export default configureRoutes;
