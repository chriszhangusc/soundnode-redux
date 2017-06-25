import React from 'react';
import { validateGenre } from 'features/charts/chartsUtils';
import { DEFAULT_GENRE } from 'features/charts/chartsConsts';
import * as routes from 'common/constants/routeConsts';
import Charts from 'features/charts/Charts';
import { Route, Switch, Redirect } from 'react-router-dom';
import UserProfile from 'features/userProfile/UserProfile';
import TrackProfile from 'features/trackProfile/TrackProfile';
import Favorites from 'features/favorites/Favorites';
import Stream from 'features/stream/Stream';

const defaultRedirect = <Redirect to={`${routes.CHARTS_ROUTE}/${DEFAULT_GENRE}`} />;

export default function Routing() {
  return (
    <Switch>
      <Route
        exact
        path={`${routes.CHARTS_ROUTE}/:genre?`}
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
      <Route exact path={`${routes.FAVORITES_ROUTE}`} component={Favorites} />
      <Route exact path={`${routes.STREAM_ROUTE}`} component={Stream} />
      {defaultRedirect}
    </Switch>
  );
}
