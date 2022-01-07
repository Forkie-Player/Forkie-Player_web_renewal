import { combineReducers } from 'redux'
import navExpansion from './navExpansion'
import screenSize from './screenSize'
import loading from './loading'
import searchResult from './searchResult'
import isFirst from './isFirst'
import { all } from 'redux-saga/effects'
import playlist, { playlistSaga } from './playlist'
import userInfo from './userInfo'

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
  yield all([playlistSaga()])
}

export default rootReducer
