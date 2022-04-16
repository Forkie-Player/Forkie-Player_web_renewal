import { call, put, select, takeLatest } from 'redux-saga/effects'
import { changeVideoOrder, deleteVideo, editVideoTimeRange, getVideoList } from '../../lib/api/videos'
import { changeVideoOrderAsync, deleteVideoAsync, editTimeRangeAsync, getVideoAsync } from './actions'

import { IChangeVideoOrderInPlaylistRequest, IGetVideoListSuccess } from '../../lib/api/types'
import handleSagaError from '../handleSagaError'
import { RootModuleType } from '../moduleTypes'
import { TVideoStoreType } from './types'
import { clearThumbnail, setThumbnail } from '../playlist/actions'

const getState = (state: RootModuleType) => state.video

function* getVideoSaga(action: ReturnType<typeof getVideoAsync.request>) {
  try {
    const response: IGetVideoListSuccess = yield call(getVideoList, action.payload)
    yield put(getVideoAsync.success({ playlistId: action.payload, items: response.data }))
  } catch (err) {
    yield handleSagaError(err, deleteVideoAsync.failure)
  }
}

function* deleteVideoSaga(action: ReturnType<typeof deleteVideoAsync.request>) {
  try {
    yield call(deleteVideo, action.payload)
    /**
     * 비디오 삭제 완료 : 삭제한 영상이
     *  현재 재생중인 동영상이면, 다음 영상 재생(마지막 영상일 경우 첫번째 영상)
     *  현재 재생중인 동영상이 아니면, 현재 재생중인 동영상 유지
     */
    const state: TVideoStoreType = yield select(getState)
    let currentVideo = state.currentVideo
    if (currentVideo.id === action.payload.playId) {
      if (currentVideo.sequence >= state.items.length) {
        currentVideo = state.items[0]
      } else {
        currentVideo = state.items[currentVideo.sequence]
      }
    }
    yield put(deleteVideoAsync.success({ id: action.payload.playId, currentVideo }))

    if (state.items.length === 1 && state.playlistId !== null) {
      // 마지막 남은 비디오를 삭제한 경우
      yield put(clearThumbnail(state.playlistId))
    } else if (action.payload.playId === state.items[0].id && state.playlistId !== null) {
      // 첫번째 비디오를 삭제한 경우
      yield put(setThumbnail(state.playlistId, state.items[1].thumbnail))
    }
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
      list: state.items.map((item, index) => {
        return {
          playId: item.id,
          sequence: from !== index ? (to !== index ? item.sequence : from + 1) : to + 1,
        }
      }),
    }

    yield call(changeVideoOrder, request)
    yield put(changeVideoOrderAsync.success(request.list))
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
