import { combineReducers } from 'redux'
import { all } from 'redux-saga/effects'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

import navExpansion from './navExpansion'

import screenSize from './screenSize'

import loading from './loading'

import searchResult from './searchResult'
import searchResultSaga from './searchResult/saga'

import isFirst from './isFirst'

import userInfo from './userInfo'
import userInfoSaga from './userInfo/saga'

import playlist from './playlist'
import playlistSaga from './playlist/saga'

import video from './video'
import videoSaga from './video/saga'

const persistConfig = {
  key: 'root',
  // localStorage에 저장합니다.
  storage,
  // auth, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
  whitelist: ['navExpansion', 'userInfo', 'playlist', 'video'],
  // blacklist -> 그것만 제외합니다
}

const rootReducer = combineReducers({
  userInfo,
  navExpansion,
  screenSize,
  loading,
  searchResult,
  isFirst,
  playlist,
  video,
})

// react saga 연결
export function* rootSaga() {
  yield all([playlistSaga(), searchResultSaga(), userInfoSaga(), videoSaga()])
}

export default persistReducer(persistConfig, rootReducer)
