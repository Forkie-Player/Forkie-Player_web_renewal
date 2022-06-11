import axios from 'axios'
import toast from 'react-hot-toast'
import { put } from 'redux-saga/effects'
import { PayloadAction } from 'typesafe-actions'
import * as Sentry from '@sentry/react'
import * as Strings from '../lib/strings'

type ErrorMessageFromServerKeys = keyof typeof Strings.ErrorMessageFromServer
type ErrorMessageToUserKeys = keyof typeof Strings.ErrorMessageToUser

export default function* handleSagaError(err: unknown, failure: (payload: string) => PayloadAction<string, string>) {
  let errorMessage = Strings.ErrorMessageToUser.UNKOWN_ERROR
  if (axios.isAxiosError(err)) {
    for (const errMsg in Strings.ErrorMessageFromServer) {
      if (Strings.ErrorMessageFromServer[errMsg as ErrorMessageFromServerKeys] === err.response?.data.message) {
        errorMessage = Strings.ErrorMessageToUser[errMsg as ErrorMessageToUserKeys]
        break
      }
    }
  }
  Sentry.captureException(`Catched Error : ${err}`)
  yield put(failure(errorMessage))
  toast.error(errorMessage)
}
