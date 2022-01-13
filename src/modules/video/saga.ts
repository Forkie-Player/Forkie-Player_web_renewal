import { call, put, takeLatest } from 'redux-saga/effects'
import { deleteVideo, editVideoTimeRange, getVideoList } from '../../lib/api/videos'
import { deleteVideoAsync, editTimeRangeAsync, getVideoAsync } from './actions'

import { IDeleteVideoSuccess, IGetVideoListSuccess } from '../../lib/api/types'
import handleSagaError from '../handleSagaError'

function* getVideoSaga(action: ReturnType<typeof getVideoAsync.request>) {
  try {
    const response: IGetVideoListSuccess = yield call(getVideoList, action.payload)
    yield put(getVideoAsync.success(response.response))
  } catch (err) {
    handleSagaError(err, deleteVideoAsync.failure)
  }
}

function* deleteVideoSaga(action: ReturnType<typeof deleteVideoAsync.request>) {
  try {
    const res: IDeleteVideoSuccess = yield call(deleteVideo, action.payload)
    yield put(deleteVideoAsync.success(res.id))
  } catch (err) {
    handleSagaError(err, deleteVideoAsync.failure)
  }
}

function* editTimeRangeSaga(action: ReturnType<typeof editTimeRangeAsync.request>) {
  try {
    yield call(editVideoTimeRange, action.payload)
    yield put(editTimeRangeAsync.success(action.payload))
  } catch (err) {
    handleSagaError(err, editTimeRangeAsync.failure)
  }
}

export default function* videoSage() {
  yield takeLatest(getVideoAsync.request, getVideoSaga)
  yield takeLatest(deleteVideoAsync.request, deleteVideoSaga)
  yield takeLatest(editTimeRangeAsync.request, editTimeRangeSaga)
}
