import { call, put, select, takeLatest } from 'redux-saga/effects'
import { changeVideoOrder, deleteVideo, editVideoTimeRange, getVideoList } from '../../lib/api/videos'
import { changeVideoOrderAsync, deleteVideoAsync, editTimeRangeAsync, getVideoAsync } from './actions'

import {
  IChangeVideoOrderInPlaylistRequest,
  IChangeVIdeoOrderInPlaylistSuccess,
  IDeleteVideoSuccess,
  IGetVideoListSuccess,
} from '../../lib/api/types'
import handleSagaError from '../handleSagaError'
import { RootModuleType } from '../moduleTypes'
import { TVideoStoreType } from './types'

const getState = (state: RootModuleType) => state.video

function* getVideoSaga(action: ReturnType<typeof getVideoAsync.request>) {
  try {
    const response: IGetVideoListSuccess = yield call(getVideoList, action.payload)
    yield put(getVideoAsync.success({ playlistId: action.payload, items: response.response }))
  } catch (err) {
    yield handleSagaError(err, deleteVideoAsync.failure)
  }
}

function* deleteVideoSaga(action: ReturnType<typeof deleteVideoAsync.request>) {
  try {
    const res: IDeleteVideoSuccess = yield call(deleteVideo, action.payload)
    yield put(deleteVideoAsync.success(res.id))
  } catch (err) {
    yield handleSagaError(err, deleteVideoAsync.failure)
  }
}

function* editTimeRangeSaga(action: ReturnType<typeof editTimeRangeAsync.request>) {
  try {
    yield call(editVideoTimeRange, action.payload)
    yield put(editTimeRangeAsync.success(action.payload))
  } catch (err) {
    yield handleSagaError(err, editTimeRangeAsync.failure)
  }
}

function* changeVideoOrderSaga(action: ReturnType<typeof changeVideoOrderAsync.request>) {
  try {
    const state: TVideoStoreType = yield select(getState)
    const { from, to } = action.payload
    const request: IChangeVideoOrderInPlaylistRequest = {
      playlistId: state.playlistId as number,
      seqList: state.items.map((item, index) => {
        return {
          id: item.id,
          sequence: from !== index ? (to !== index ? item.sequence : from + 1) : to + 1,
        }
      }),
    }

    const res: IChangeVIdeoOrderInPlaylistSuccess = yield call(changeVideoOrder, request)
    yield put(changeVideoOrderAsync.success(res.response))
  } catch (err) {
    yield handleSagaError(err, changeVideoOrderAsync.failure)
  }
}

export default function* videoSage() {
  yield takeLatest(getVideoAsync.request, getVideoSaga)
  yield takeLatest(deleteVideoAsync.request, deleteVideoSaga)
  yield takeLatest(editTimeRangeAsync.request, editTimeRangeSaga)
  yield takeLatest(changeVideoOrderAsync.request, changeVideoOrderSaga)
}
