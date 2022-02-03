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

import * as Sentry from '@sentry/react'
import { Integrations } from '@sentry/tracing'

/**
 * 리덕스 관련 초기화 작업들
 */
const sagaMiddleware = createSagaMiddleware()

const store =
  !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
    ? createStore(rootReducer, applyMiddleware(logger, sagaMiddleware))
    : createStore(rootReducer, applyMiddleware(sagaMiddleware))

const persistor = persistStore(store)
sagaMiddleware.run(rootSaga)

/**
 * Sentry 관련 초기화 작업들
 */
Sentry.init({
  dsn: !process.env.NODE_ENV || process.env.NODE_ENV === 'development' ? '' : process.env.REACT_APP_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  environment: process.env.NODE_ENV,
  tracesSampleRate: 0.5,
})

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
