import React from 'react';
import { Route, Router, IndexRedirect, browserHistory } from 'react-router';
import App from '../components/App';
import Main from '../components/Main';
import NotFound from '../components/NotFound';

import { DEFAULT_GENRE } from '../constants/SongConstants';
import { fetchSongsOnLoad } from '../actions/playlists';


const configureRoutes = (store) => {

  const onEnterHandler = (nextState) => {
    const genre = nextState.params.genre;
    const playlists = store.getState().playlists;
    store.dispatch(fetchSongsOnLoad(genre, playlists));
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`songs/${DEFAULT_GENRE}`} />
        <Route path="songs/(:genre)" component={Main} onEnter={onEnterHandler}/>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );
};

export default configureRoutes;
