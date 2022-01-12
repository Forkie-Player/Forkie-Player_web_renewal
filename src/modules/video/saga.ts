import { call, put, takeLatest } from 'redux-saga/effects'
import { getVideoList } from '../../lib/api/videos'
import { getVideoAsync } from './actions'

import * as Strings from '../../lib/strings'
import axios from 'axios'
import toast from 'react-hot-toast'
import { IVideoHasRange } from '../../types'

function* getVideoSaga(action: ReturnType<typeof getVideoAsync.request>) {
  try {
    const response: IVideoHasRange[] = yield call(getVideoList, action.payload)
    yield put(getVideoAsync.success(response))
  } catch (err) {
    if (axios.isAxiosError(err)) {
      yield put(getVideoAsync.failure(err.response?.data.message))
      toast.error(err.response?.data.message)
    } else {
      yield put(getVideoAsync.failure(Strings.UnknownError))
      toast.error(Strings.UnknownError)
    }
  }
}

export default function* videoSage() {
  yield takeLatest(getVideoAsync.request, getVideoSaga)
}
