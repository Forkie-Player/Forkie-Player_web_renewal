import axios from 'axios'
import toast from 'react-hot-toast'
import { put } from 'redux-saga/effects'
import { PayloadAction } from 'typesafe-actions'
import * as Sentry from '@sentry/react'
import * as Strings from '../lib/strings'

type ErrorMessageFromServerKeys = keyof typeof Strings.ErrorMessageFromServer
type ErrorMessageFromClientKeys = keyof typeof Strings.ErrorMessageFromClient
type ErrorMessageToUserKeys = keyof typeof Strings.ErrorMessageToUser

export default function* handleSagaError(err: unknown, failure: (payload: string) => PayloadAction<string, string>) {
  let errorMessage = Strings.ErrorMessageToUser.UNKOWN_ERROR

  if (axios.isAxiosError(err)) {
    for (const errMsgFromServer in Strings.ErrorMessageFromServer) {
      if (
        Strings.ErrorMessageFromServer[errMsgFromServer as ErrorMessageFromServerKeys] === err.response?.data.message
      ) {
        errorMessage = Strings.ErrorMessageToUser[errMsgFromServer as ErrorMessageToUserKeys]
        break
      }
    }
  } else {
    for (const errMsgFromClient in Strings.ErrorMessageFromClient) {
      if (Strings.ErrorMessageFromClient[errMsgFromClient as ErrorMessageFromClientKeys] === err) {
        errorMessage = Strings.ErrorMessageToUser[errMsgFromClient as ErrorMessageToUserKeys]
        break
      }
    }
  }

  Sentry.captureException(`Catched Error : ${err}`)
  yield put(failure(errorMessage))
  toast.error(errorMessage)
}
