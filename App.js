import React from 'react';
import { Provider } from 'react-redux';
import store from './store';
import Navigation from './Navigation';

export default class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <Navigation />
      </Provider>
    );
  }
}

// google image api key  AIzaSyDyLC_23d0L6EpFa7NNc7Bj9K3KU7WyGgc 
