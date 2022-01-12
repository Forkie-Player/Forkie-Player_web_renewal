import { createAsyncAction } from 'typesafe-actions'
import { IVideoHasRange } from '../../types'

// 액션 타입
const GET_VIDEO = 'video/GET_VIDEO' as const
const GET_VIDEO_SUCCESS = 'video/GET_VIDEO_SUCCESS' as const
const GET_VIDEO_ERROR = 'video/GET_VIDEO_ERROR' as const

export const videoActionTypes = {
  GET_VIDEO,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_ERROR,
}

// 액션 생성 함수
export const getVideoAsync = createAsyncAction(GET_VIDEO, GET_VIDEO_SUCCESS, GET_VIDEO_ERROR)<
  number,
  IVideoHasRange[],
  string
>()

export const videoActions = {
  getVideoAsync,
}
