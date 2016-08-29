import React from 'react';
import {Route, Router, IndexRoute, IndexRedirect, hashHistory} from 'react-router';
import App from 'App';
import SongCardsContainer from '../containers/SongCardsContainer';
import {GENRES, DEFAULT_GENRE} from '../constants/SongConstants';

export default (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <IndexRedirect to={`songs/${DEFAULT_GENRE}`} />
      <Route path="songs/:genre" component={SongCardsContainer} />
    </Route>
  </Router>
);
