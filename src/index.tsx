import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { applyMiddleware, createStore } from 'redux'
import rootReducer, { rootSaga } from './modules'
import { Provider } from 'react-redux'
import logger from 'redux-logger'
import AppInit from './AppInit'
import createSagaMiddleware from 'redux-saga'
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const sagaMiddleware = createSagaMiddleware()

const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware))
const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

console.log('test')
ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInit>
          <App />
        </AppInit>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
