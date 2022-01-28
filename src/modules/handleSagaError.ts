import axios from 'axios'
import toast from 'react-hot-toast'
import { put } from 'redux-saga/effects'
import { PayloadAction } from 'typesafe-actions'

import * as Strings from '../lib/strings'

export default function* handleSagaError(err: unknown, failure: (payload: string) => PayloadAction<string, string>) {
  let errorMessage = Strings.ErrorMessageToUser.UNKOWN_ERROR
  if (axios.isAxiosError(err)) {
    switch (err.response?.data.message) {
      case [Strings.ErrorMessageFromServer.EXCEED_NONMEMBER_MAX_PLAYLIST]:
        errorMessage = Strings.ErrorMessageToUser.EXCEED_NONMEMBER_MAX_PLAYLIST
        break
    }
  }
  console.log(err)
  yield put(failure(errorMessage))
  toast.error(errorMessage)
}
