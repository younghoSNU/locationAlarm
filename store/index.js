import { createStore, compose, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import reducers from '../reducers'; //index.js할 필요 x

const persistConfig = {
  key: 'root',
  storage,
}

const enhancedReducers = persistReducer(persistConfig, reducers);

const store = createStore(
  enhancedReducers,
  compose(
    applyMiddleware(thunk, logger),
    //autoRehydrate()
  )
);

//persistStore(store, { Storage: AsyncStorage, whitelist: {'likedJobs'} });

export default store;
