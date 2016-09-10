import React from 'react';
import {Route, Router, IndexRoute, IndexRedirect, browserHistory} from 'react-router';
import App from '../components/App';
import SongCardsContainer from '../containers/SongCardsContainer';
import {GENRES, DEFAULT_GENRE} from '../constants/SongConstants';
import {fetchSongsOnLoad} from '../actions/playlists';
import {loadPlaylist} from '../actions/player';
import Test from '../components/Test';
import NotFound from '../components/NotFound';

const configureRoutes = (store) => {

  const onEnterHandler = (nextState) => {
    const genre = nextState.params.genre;
    const playlists = store.getState().playlists;
    store.dispatch(loadPlaylist(genre));
    store.dispatch(fetchSongsOnLoad(genre, playlists));
  };

  return (
    <Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`songs/${DEFAULT_GENRE}`} />
        <Route path="songs/:genre" component={SongCardsContainer} onEnter={onEnterHandler}/>
        <Route path="*" component={NotFound} />
      </Route>
    </Router>
  );

};

export default configureRoutes;
