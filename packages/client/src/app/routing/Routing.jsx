import React from 'react';
import { validateGenre } from '@soundnode-redux/client/src/features/charts/chartsUtils';
import { DEFAULT_GENRE } from '@soundnode-redux/client/src/features/charts/chartsConsts';
import * as routes from '@soundnode-redux/client/src/common/constants/routeConsts';
import Charts from '@soundnode-redux/client/src/features/charts/Charts';
import { Route, Switch, Redirect } from 'react-router-dom';
import withAuthRequired from '@soundnode-redux/client/src/common/hocs/withAuthRequired';
import UserProfile from '@soundnode-redux/client/src/features/userProfile/UserProfile';
import TrackProfile from '@soundnode-redux/client/src/features/trackProfile/TrackProfile';
import Favorites from '@soundnode-redux/client/src/features/favorites/Favorites';
import Stream from '@soundnode-redux/client/src/features/stream/Stream';
import Search from '@soundnode-redux/client/src/features/search/Search';
import Playlists from '@soundnode-redux/client/src/features/playlists/Playlists';

const defaultRedirect = <Redirect to={`${routes.CHARTS_ROUTE}/${DEFAULT_GENRE}`} />;

function Routing() {
  return (
    <Switch>
      <Route
        exact
        path={`${routes.CHARTS_ROUTE}/:genre`}
        render={(routeProps) => {
          // Validate route on route change
          const { match } = routeProps;
          const genreFromUrl = match.params.genre;
          const valid = validateGenre(genreFromUrl);
          return valid ? <Charts {...routeProps} /> : defaultRedirect;
        }}
      />
      <Route exact path={`${routes.USER_PROFILE_ROUTE}/:userId`} component={UserProfile} />
      <Route exact path={`${routes.TRACK_PROFILE_ROUTE}/:trackId`} component={TrackProfile} />
      <Route exact path={`${routes.FAVORITES_ROUTE}`} component={withAuthRequired(Favorites)} />
      <Route exact path={`${routes.STREAM_ROUTE}`} component={withAuthRequired(Stream)} />
      <Route exact path={`${routes.PLAYLISTS_ROUTE}`} component={withAuthRequired(Playlists)} />
      <Route exact path={`${routes.SEARCH_ROUTE}/:query`} component={Search} />
      {defaultRedirect}
    </Switch>
  );
}

export default Routing;
