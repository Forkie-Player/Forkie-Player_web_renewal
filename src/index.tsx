import React from 'react'
import * as ReactDOM from 'react-dom/client'
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
import { BrowserTracing } from '@sentry/tracing'

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
  integrations: [new BrowserTracing()],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for performance monitoring.
  // We recommend adjusting this value in production
  tracesSampleRate: 1.0,
})
/**
 * 렌더
 *
 */
const rootElement = document.getElementById('root')
if (rootElement === null) {
  throw new Error('Root element is null')
}
const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Sentry.ErrorBoundary>
          <AppInit>
            <App />
          </AppInit>
        </Sentry.ErrorBoundary>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
)
