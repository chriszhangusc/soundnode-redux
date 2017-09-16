import React from 'react';
import SC from 'soundcloud';
import Callback from 'common/components/Callback';
import { CLIENT_ID, REDIRECT_URI } from 'common/constants/authConsts';
import { Route, Switch } from 'react-router-dom';
import { AUTH_CALLBACK_ROUTE } from 'common/constants/routeConsts';
import 'app/css/global';
import Main from './Main';

SC.initialize({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'non-expiring',
});

function App() {
  return (
    <Switch>
      <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />
      <Route component={Main} />
    </Switch>
  );
}

export default App;
