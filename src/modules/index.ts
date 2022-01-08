import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'

import navExpansion from './navExpansion'

import screenSize from './screenSize'

import loading from './loading'

import searchResult from './searchResult'
import { searchResultSaga } from './searchResult/saga'

import isFirst from './isFirst'

import userInfo from './userInfo'
import userInfoSaga from './userInfo/saga'

import playlist from './playlist'
import { playlistSaga } from './playlist/saga'

const rootReducer = combineReducers({
  userInfo,
  navExpansion,
  screenSize,
  loading,
  searchResult,
  isFirst,
  playlist,
})

// react saga 연결
export function* rootSaga() {
  yield all([playlistSaga(), searchResultSaga(), userInfoSaga()])
}

export default rootReducer
