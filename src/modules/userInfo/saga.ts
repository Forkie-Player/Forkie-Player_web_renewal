import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserInfoApi } from '../../lib/api/auth'
import { IGetUserInfoSuccess } from '../../lib/api/types'
import handleSagaError from '../handleSagaError'
import { getUserInfo } from './actions'

function* getUserInfoSaga() {
  try {
    const res: IGetUserInfoSuccess = yield call(getUserInfoApi)
    yield put(getUserInfo.success(res.response))
  } catch (err) {
    handleSagaError(err, getUserInfo.failure)
  }
}

export default function* userInfoSaga() {
  yield takeLatest(getUserInfo.request, getUserInfoSaga)
}
