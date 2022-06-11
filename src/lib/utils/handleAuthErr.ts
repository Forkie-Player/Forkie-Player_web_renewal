import { testEmail, testPassword } from './testRegs'

import { auth as authStrings } from '../strings'
import axios from 'axios'

export default function handleError(code: string) {
  switch (code) {
    case 'blank_id':
      return authStrings.BLANK_ID
    case 'short_id':
      return authStrings.SHORT_ID
    case 'blank_password':
      return authStrings.BLANK_PASSWORD
    case 'auth/wrong_id':
      return authStrings.WRONG_ID
    case 'auth/wrong_email':
      return authStrings.WRONG_EMAIL
    case 'auth/wrong-password':
      return authStrings.WRONG_PASSWORD
    case 'auth/user-not-found':
      return authStrings.USER_NOT_EXST
    case 'auth/id-already-in-use':
      return authStrings.ID_ALREADY_EXST
    case 'not_match_password_and_check':
      return authStrings.PASSWORD_CHECK_NOT_MATCH
    case 'password_not_formmatted':
      return authStrings.PASSWORD_NOT_FORMATTED
    case 'auth/same-password':
      return authStrings.SAME_PASSWORD
    default:
      return authStrings.UNKNOWN_ERROR
  }
}

export const checkId = (id: string, isOnSignUp: boolean = false) => {
  if (!id) {
    throw Error(handleError('blank_id'))
  } else if (id.length < 6) {
    throw Error(handleError('short_id'))
  } else if (isOnSignUp === true && !testEmail(id)) {
    throw Error(handleError('auth/wrong_email'))
  }
}

export const checkPassword = (password: string, passwordCheck?: string) => {
  if (!password) {
    throw Error(handleError('blank_password'))
  } else if (!testPassword(password)) {
    throw Error(handleError('password_not_formmatted'))
  } else if (passwordCheck !== undefined && password !== passwordCheck) {
    throw Error(handleError('not_match_password_and_check'))
  }
}

export const checkPasswordCheck = (password: string, passwordCheck: string) => {
  if (password !== passwordCheck) {
    throw Error(handleError('not_match_password_and_check'))
  }
}

export const handleAuthApiError = (err: any) => {
  if (axios.isAxiosError(err)) {
    switch (err.response?.data.message) {
      case '비밀번호가 일치하지 않습니다.':
        return handleError('auth/wrong-password')
      case '존재하지 않는 회원입니다.':
        return handleError('auth/user-not-found')
      case 'Already register Member':
        return handleError('auth/id-already-in-use')
      case '기존 비밀번호와 같은 비밀번호 입니다.':
        return handleError('auth/same-password')
      case '잘못된 LoginId':
        return handleError('auth/wrong_id')
      case 'No value present':
        return handleError('auth/user-not-found')
      default:
        return handleError('auth/unknown-error')
    }
  } else {
    return handleError('auth/unknown-error')
  }
}

export const classifyError = (err: string): 'password' | 'id' | 'passwordCheck' => {
  switch (err) {
    case authStrings.WRONG_PASSWORD:
      return 'password'
    case authStrings.BLANK_PASSWORD:
      return 'password'
    case authStrings.USER_NOT_EXST:
      return 'id'
    case authStrings.ID_ALREADY_EXST:
      return 'id'
    case authStrings.PASSWORD_CHECK_NOT_MATCH:
      return 'passwordCheck'
    case authStrings.PASSWORD_NOT_FORMATTED:
      return 'password'
    case authStrings.WRONG_ID:
      return 'id'
    case authStrings.SAME_PASSWORD:
      return 'password'
  }
  return 'password'
}
