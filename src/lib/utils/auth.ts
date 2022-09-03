import { getCookie, removeCookie, setCookie } from './cookie'
import { login, reissue, removeUser, userSignUp } from '../api/auth'
import { IToken } from '../../types'
import axios from 'axios'

import * as authUtils from './auth'

import { ErrorMessageFromServer } from '../strings'

export const authInit = async () => {
  const tokensJson = getCookie('@tokens')

  if (tokensJson !== undefined) {
    //reissue
    try {
      await reissue(tokensJson)
      return true
    } catch (err) {
      return false
    }
  } else {
    return false
  }
}

export const setTokens = async (tokens: IToken) => {
  const tokensObj = {
    accessToken: tokens.accessToken,
    refreshToken: tokens.refreshToken,
  }
  axios.defaults.headers.common['Authorization'] = `Bearer ${tokensObj.accessToken}`
  setCookie('@tokens', JSON.stringify(tokensObj))
}

export const SignUp = async (id: string, pw: string) => {
  try {
    await userSignUp(id, pw)
  } catch (err) {
    // 중복 아이디 처리
    throw err
  }
  return await login(id, pw)
}

export const logout = async () => {
  try {
    removeCookie('@tokens')
  } catch (err) {
    throw err
  }
}

export const withdrawlUser = async () => {
  try {
    await removeUser()
  } catch (err) {
    throw ErrorMessageFromServer.REMOVE_USER_FAIL
  }

  try {
    await authUtils.logout()
  } catch (err) {
    throw ErrorMessageFromServer.NONMEMBER_LOGIN_FAIL
  }
}

interface OAuthParam {
  storageKey: string
  url: string
  callbackOnStorageEvent: () => Promise<void> | void
}
export const oauth = ({ storageKey, url, callbackOnStorageEvent }: OAuthParam) => {
  const popup = window.open(url, '_blank', 'popup')
  const localstorageEventCallback = async (e: StorageEvent) => {
    if (e.key === storageKey) {
      window.removeEventListener('storage', localstorageEventCallback)
      callbackOnStorageEvent()
    }
  }

  window.addEventListener('storage', localstorageEventCallback)
  const intervalId = setInterval(() => {
    if (popup === null || popup?.closed) {
      clearInterval(intervalId)
      window.removeEventListener('storage', localstorageEventCallback)
    }
  }, 1000)
}
