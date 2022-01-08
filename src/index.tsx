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

const sagaMiddleware = createSagaMiddleware()
const store = createStore(rootReducer, applyMiddleware(logger, sagaMiddleware))
sagaMiddleware.run(rootSaga)

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <AppInit>
        <App />
      </AppInit>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
