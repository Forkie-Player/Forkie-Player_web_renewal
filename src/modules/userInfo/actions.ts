import { AxiosError } from 'axios'
import { createAction, createAsyncAction } from 'typesafe-actions'
import { IUserInfo } from '../../types'

//액션 타입
const GET_USERINFO = 'userInfo/GET_USERINFO' as const
const GET_USERINFO_SUCCESS = 'userInfo/GET_USERINFO_SUCCESS' as const
const GET_USERINFO_FAILURE = 'userInfo/GET_USERINFO_FAILURE' as const
const CLEAR_USER_INFO = 'userInfo/CLEAR_USER_INFO' as const

export const userInfoActionTypes = {
  GET_USERINFO,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILURE,
  CLEAR_USER_INFO,
}

//액션 생성 함수
export const getUserInfo = createAsyncAction(GET_USERINFO, GET_USERINFO_SUCCESS, GET_USERINFO_FAILURE)<
  undefined,
  IUserInfo,
  AxiosError
>()
export const clearUserInfo = createAction(CLEAR_USER_INFO)()

export const userInfoActions = {
  getUserInfo,
  clearUserInfo,
}
