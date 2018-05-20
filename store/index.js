import { createStore, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
//import storage from 'redux-persist/lib/storage';

import reducers from '../reducers';

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  whitelist: ['search'],
  debug: true
};

const persistedReducer = persistReducer(persistConfig, reducers);

export default () => {
  let store = createStore(
    persistedReducer,
    {},
    compose(
      applyMiddleware(thunk),
    )
	);   

  let persistor = persistStore(store);
  //persistor.purge();

  return { store, persistor };
};
