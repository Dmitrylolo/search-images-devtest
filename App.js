import React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import configureStore from './store';
import Navigation from './Navigation';

const { persistor, store } = configureStore();

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Navigation />
        </PersistGate>
      </Provider>
    );
  }
}

// google image api key  AIzaSyDyLC_23d0L6EpFa7NNc7Bj9K3KU7WyGgc 
