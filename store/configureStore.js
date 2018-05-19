import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
//import { AsyncStorage } from 'react-native';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['search']
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(thunk),
    )
  );  //  add a .purge();
  let persistor = persistStore(store);

  // persistor.purge();
  return { store, persistor };
};
