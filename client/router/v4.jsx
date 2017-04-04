import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import App from 'client/components/App';
import ChartsPage from 'client/routes/charts';

const AppRoutes = () => (
  <Router>
    <div>
      { /* The main frame of the app will be there no matter what */ }
      <App />
      <Switch>
        <Route path="charts/:genre?" component={ChartsPage} />
        { /* <Route component={App}>*/}
      </Switch>
    </div>
  </Router>
);

export default AppRoutes;


{/*<Router history={browserHistory}>
      <Route path="/" component={App}>
        <IndexRedirect to={`/charts/${DEFAULT_GENRE}`} />
        <Route path="charts" component={ChartsPage}>
          <IndexRedirect to={`${DEFAULT_GENRE}`} />
          <Route path=":genre" component={ChartsPage} onEnter={onChartsPageEnter} onLeave={onChartsPageLeave} />
        </Route>
        <Route path="artist">
          <Route path=":uid" component={ArtistDetailsPage} onEnter={onArtistDetailsPageEnter} />
        </Route>
        <Route path="track">
          <Route path=":trackId" component={TrackDetailsPage} onEnter={onTrackDetailsPageEnter} />
        </Route>
        <Route path="likes" component={LikesPage} onEnter={onLikesPageEnter} />
        {
          //   <Route path="tracks" component={TracksPage} />
          //   <Route path="playlists" component={PlaylistsPage} />
          //   <Route path="stream" component={StreamPage} />
        }
        <Route path="search" component={SearchResultsPage} onEnter={onSearchPageEnter} />
      </Route>
      <Route path="*">
        <IndexRedirect to={`/charts`} />
      </Route>
    </Router>*/}