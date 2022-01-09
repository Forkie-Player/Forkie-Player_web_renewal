import axios from 'axios'
import { call, put, takeLatest } from 'redux-saga/effects'
import { getPlaylistApi } from '../../lib/api/playlist'
import { IPlaylist } from '../../types'
import { getPlaylistAsync, playlistActionTypes } from './actions'

function* getPlaylistSaga(action: ReturnType<typeof getPlaylistAsync.request>) {
  try {
    const res: IPlaylist[] = yield call(getPlaylistApi)
    console.log(res)
    yield put(getPlaylistAsync.success(res))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(getPlaylistAsync.failure(err))
    }
  }
}

export function* playlistSaga() {
  yield takeLatest(playlistActionTypes.GET_PLAYLIST, getPlaylistSaga)
}
