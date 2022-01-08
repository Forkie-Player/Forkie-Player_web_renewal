import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getUserInfoApi } from '../../lib/api/auth'
import { IUserInfo } from '../../types'
import { getUserInfo } from './actions'

function* getUserInfoSaga() {
  try {
    const res: IUserInfo = yield call(getUserInfoApi)
    yield put(getUserInfo.success(res))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(getUserInfo.failure(err))
    }
  }
}

export default function* userInfoSaga() {
  yield takeLatest(getUserInfo.request, getUserInfoSaga)
}
