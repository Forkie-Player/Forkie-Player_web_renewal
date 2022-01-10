import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { addPlaylist, getPlaylistApi } from '../../lib/api/playlist'
import { IPlaylist } from '../../types'
import { addPlaylistAsync, getPlaylistAsync, playlistActionTypes } from './actions'

function* getPlaylistSaga(action: ReturnType<typeof getPlaylistAsync.request>) {
  try {
    const res: IPlaylist[] = yield call(getPlaylistApi)
    yield put(getPlaylistAsync.success(res))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(getPlaylistAsync.failure(err))
    }
  }
}

function* addPlaylistSaga(action: ReturnType<typeof addPlaylistAsync.request>) {
  try {
    const res: IPlaylist = yield call(addPlaylist, action.payload)
    yield put(addPlaylistAsync.success(res))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(addPlaylistAsync.failure(err.response?.data.message))
    } else {
      yield put(addPlaylistAsync.failure('알수없는 에러'))
    }
  }
}

export function* playlistSaga() {
  yield takeLatest(playlistActionTypes.GET_PLAYLIST, getPlaylistSaga)
  yield takeLatest(playlistActionTypes.ADD_PLAYLIST, addPlaylistSaga)
}
