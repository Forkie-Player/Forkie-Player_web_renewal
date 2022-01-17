import axios from 'axios'
import toast from 'react-hot-toast'
import { call, put, takeLatest } from 'redux-saga/effects'
import { addPlaylist, deletePlaylist, editPlaylistTitle, getPlaylistApi } from '../../lib/api/playlist'
import { addVideo } from '../../lib/api/videos'
import { IPlaylist } from '../../types'
import {
  addPlaylistAsync,
  addVideoAsync,
  deletePlaylistAsync,
  editPlaylistTitleAsync,
  getPlaylistAsync,
  playlistActionTypes,
} from './actions'
import { IAddVideoReturn } from './types'

import * as Strings from '../../lib/strings'
import { IDeletePlaylistSuccess } from '../../lib/api/types'
import handleSagaError from '../handleSagaError'

function* getPlaylistSaga() {
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
    toast.success(Strings.addPlaylistSuccess)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(addPlaylistAsync.failure(err.response?.data.message))
      toast.error(err.response?.data.message)
    } else {
      yield put(addPlaylistAsync.failure(Strings.UnknownError))
      toast.error(Strings.UnknownError)
    }
  }
}

function* addVideoSaga(action: ReturnType<typeof addVideoAsync.request>) {
  try {
    const res: IAddVideoReturn = yield call(addVideo, action.payload)
    yield put(addVideoAsync.success(res))
    toast.success(Strings.addVideoSuccess)
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(addVideoAsync.failure(err.response?.data.message))
      toast.error(err.response?.data.message)
    } else {
      yield put(addVideoAsync.failure(Strings.UnknownError))
      toast.error(Strings.UnknownError)
    }
  }
}

function* deletePlaylistSaga(action: ReturnType<typeof deletePlaylistAsync.request>) {
  try {
    const res: IDeletePlaylistSuccess = yield call(deletePlaylist, action.payload)
    yield put(deletePlaylistAsync.success(res.id))
  } catch (err) {
    handleSagaError(err, deletePlaylistAsync.failure)
  }
}

function* editPlaylistTitleSaga(action: ReturnType<typeof editPlaylistTitleAsync.request>) {
  try {
    yield call(editPlaylistTitle, action.payload)
    yield put(editPlaylistTitleAsync.success(action.payload))
  } catch (err) {
    handleSagaError(err, editPlaylistTitleAsync.failure)
  }
}

export default function* playlistSaga() {
  yield takeLatest(playlistActionTypes.GET_PLAYLIST, getPlaylistSaga)
  yield takeLatest(playlistActionTypes.ADD_PLAYLIST, addPlaylistSaga)
  yield takeLatest(playlistActionTypes.ADD_VIDEO, addVideoSaga)
  yield takeLatest(playlistActionTypes.DELETE_PLAYLIST, deletePlaylistSaga)
  yield takeLatest(playlistActionTypes.EDIT_PLAYLIST_TITLE, editPlaylistTitleSaga)
}
