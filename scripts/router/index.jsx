import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from '../components/App';
import Main from '../components/Main';
import NotFound from '../components/NotFound';
import Login from '../components/Login';

import { DEFAULT_GENRE } from '../constants/SongConstants';

import actions from '../actions';

const configureRoutes = (store) => {
  const onEnterHandler = (nextState) => {
    const playlist = nextState.params.genre;
    store.dispatch(actions.sagaLoadSongCardsPage(playlist));
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`songs/${DEFAULT_GENRE}`} />
        <Route path="login" component={Login} />
        <Route path="songs/(:genre)" component={Main} onEnter={onEnterHandler} />
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
