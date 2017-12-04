import 'isomorphic-fetch';
import 'normalize.css';
import React from 'react';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import configureStore from 'app/store/configureStore';
import App from 'app/layout/App';
import { ThemeProvider } from 'styled-components';
import { AppContainer } from 'react-hot-loader';
import theme from 'app/css/theme';
import 'font-awesome/css/font-awesome.min.css';

const store = configureStore();

function render(Component) {
  ReactDOM.render(
    <AppContainer>
      <ThemeProvider theme={theme}>
        <Provider store={store}>
          <Component />
        </Provider>
      </ThemeProvider>
    </AppContainer>,
    document.getElementById('app'),
  );
}

render(App);

if (module.hot) {
  module.hot.accept('app/layout/App', () => {
    // eslint-disable-next-line
    const NextApp = require('app/layout/App').default;
    render(NextApp);
  });
}
