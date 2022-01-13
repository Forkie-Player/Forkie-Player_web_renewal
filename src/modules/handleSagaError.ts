import axios from 'axios'
import toast from 'react-hot-toast'
import { put } from 'redux-saga/effects'
import { PayloadAction } from 'typesafe-actions'

import * as Strings from '../lib/strings'

export default function* handleSagaError(err: unknown, failure: (payload: string) => PayloadAction<string, string>) {
  if (axios.isAxiosError(err)) {
    yield put(failure(err.response?.data.message))
    toast.error(err.response?.data.message)
  } else {
    yield put(failure(Strings.UnknownError))
    toast.error(Strings.UnknownError)
  }
}
