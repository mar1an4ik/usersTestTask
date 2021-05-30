import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import createSagaMiddleware from 'redux-saga'
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage'

import { UsersReducer } from "../reducers";
import { rootWatcher } from "../sagas";

const sagaMiddleware = createSagaMiddleware();

let reducers = combineReducers({
  usersBranch: UsersReducer
});

const persistConfig = {
  key: 'root',
  storage
};

const persistedReducer = persistReducer(persistConfig, reducers);

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(persistedReducer, composeEnhancers(
  applyMiddleware(sagaMiddleware)
));

sagaMiddleware.run(rootWatcher);


export { store };
export const persistor = persistStore(store);
