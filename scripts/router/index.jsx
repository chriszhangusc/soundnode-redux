import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from '../components/App';
import TopMusicPage from '../components/TopMusicPage';
import NotFound from '../components/NotFound';
import Login from '../components/Login';
import { DEFAULT_GENRE } from '../constants/SongConstants';
import LikesContainer from '../containers/LikesContainer';

import actions from '../actions';

const configureRoutes = (store) => {
  const onEnterHandler = (nextState) => {
    const playlist = nextState.params.genre || DEFAULT_GENRE;
    store.dispatch(actions.sagaLoadSongCardsPage(playlist));
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`top50/${DEFAULT_GENRE}`} />
        <Route path="login" component={Login} />
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
