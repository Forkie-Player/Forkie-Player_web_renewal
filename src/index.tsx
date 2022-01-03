import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { applyMiddleware, createStore } from 'redux'
import rootReducer from './modules'
import { Provider } from 'react-redux'
import logger from 'redux-logger'

const store = createStore(rootReducer, applyMiddleware(logger))

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)
