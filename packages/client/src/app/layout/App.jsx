import React from 'react';
import SC from 'soundcloud';
import Callback from '@soundnode-redux/client/src/common/components/Callback';
import { CLIENT_ID, REDIRECT_URI } from '@soundnode-redux/client/src/common/constants/authConsts';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { AUTH_CALLBACK_ROUTE } from '@soundnode-redux/client/src/common/constants/routeConsts';
import GlobalStyles from '@soundnode-redux/client/src/common/components/GlobalStyles';
import Main from './Main';

SC.initialize({
  client_id: CLIENT_ID,
  redirect_uri: REDIRECT_URI,
  scope: 'non-expiring',
});

function App() {
  return (
    <React.Fragment>
      <GlobalStyles />
      <BrowserRouter>
        <Switch>
          <Route exact path={AUTH_CALLBACK_ROUTE} component={Callback} />
          <Route component={Main} />
        </Switch>
      </BrowserRouter>
    </React.Fragment>
  );
}

export default App;
