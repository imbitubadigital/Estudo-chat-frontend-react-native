import React, { Fragment } from 'react';

import { Toast } from 'react-native-redux-toast';
import '~/config/ReactotronConfig';
import '~/config/DevToolsConfig';

import '~/services/window';

import { Provider } from 'react-redux';
import store from './store';

import AppInit from './AppInit';

// import Routes from '~/routes';

const App = () => (
  <Provider store={store}>
    <Fragment>
      <AppInit />
      <Toast messageStyle={{ zIndex: 2000 }} />
    </Fragment>
  </Provider>
);

export default App;
