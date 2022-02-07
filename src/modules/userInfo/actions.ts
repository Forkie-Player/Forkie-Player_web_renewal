import { createAction, createAsyncAction } from 'typesafe-actions'
import { IUserInfo } from '../../types'

//액션 타입
const GET_USERINFO = 'userInfo/GET_USERINFO' as const
const GET_USERINFO_SUCCESS = 'userInfo/GET_USERINFO_SUCCESS' as const
const GET_USERINFO_FAILURE = 'userInfo/GET_USERINFO_FAILURE' as const

const UPDATE_PROFILE_IMG = 'userInfo/UPDATE_PROFILE_IMG' as const
const UPDATE_PROFILE_IMG_SUCCESS = 'userInfo/UPDATE_PROFILE_IMG_SUCCESS' as const
const UPDATE_PROFILE_IMG_FAILURE = 'userInfo/UPDATE_PROFILE_IMG_FAILURE' as const

const SET_USERINFO = 'userInfo/SET_USERINFO' as const
const CLEAR_USER_INFO = 'userInfo/CLEAR_USER_INFO' as const

export const userInfoActionTypes = {
  GET_USERINFO,
  GET_USERINFO_SUCCESS,
  GET_USERINFO_FAILURE,
  UPDATE_PROFILE_IMG,
  UPDATE_PROFILE_IMG_SUCCESS,
  UPDATE_PROFILE_IMG_FAILURE,
  SET_USERINFO,
  CLEAR_USER_INFO,
}

//액션 생성 함수
export const getUserInfo = createAsyncAction(GET_USERINFO, GET_USERINFO_SUCCESS, GET_USERINFO_FAILURE)<
  undefined,
  IUserInfo,
  string
>()
export const updateProfileImgAsync = createAsyncAction(
  UPDATE_PROFILE_IMG,
  UPDATE_PROFILE_IMG_SUCCESS,
  UPDATE_PROFILE_IMG_FAILURE,
)<File, string, string>()
export const setUserInfo = createAction(SET_USERINFO, (payload: IUserInfo) => payload)<IUserInfo>()
export const clearUserInfo = createAction(CLEAR_USER_INFO)()

export const userInfoActions = {
  getUserInfo,
  updateProfileImgAsync,
  clearUserInfo,
  setUserInfo,
}
