import { createAsyncAction } from 'typesafe-actions'
import { IEditVideoTimeRangeRequest } from '../../lib/api/types'
import { IVideoInPlaylist } from '../../types'

// 액션 타입
const GET_VIDEO = 'video/GET_VIDEO' as const
const GET_VIDEO_SUCCESS = 'video/GET_VIDEO_SUCCESS' as const
const GET_VIDEO_ERROR = 'video/GET_VIDEO_ERROR' as const
const DELETE_VIDEO = 'video/DELETE_VIDEO' as const
const DELETE_VIDEO_SUCCESS = 'video/DELETE_VIDEO_SUCCESS' as const
const DELETE_VIDEO_ERROR = 'video/DELETE_VIDEO_ERROR' as const
const EDIT_TIMERANGE_VIDEO = 'video/EDIT_TIMERANGE_VIDEO' as const
const EDIT_TIMERANGE_VIDEO_SUCCESS = 'video/EDIT_TIMERANGE_VIDEO_SUCCESS' as const
const EDIT_TIMERANGE_VIDEO_ERROR = 'video/EDIT_TIMERANGE_VIDEO_ERROR' as const

export const videoActionTypes = {
  GET_VIDEO,
  GET_VIDEO_SUCCESS,
  GET_VIDEO_ERROR,
  DELETE_VIDEO,
  DELETE_VIDEO_SUCCESS,
  DELETE_VIDEO_ERROR,
  EDIT_TIMERANGE_VIDEO,
  EDIT_TIMERANGE_VIDEO_SUCCESS,
  EDIT_TIMERANGE_VIDEO_ERROR,
}

// 액션 생성 함수
export const getVideoAsync = createAsyncAction(GET_VIDEO, GET_VIDEO_SUCCESS, GET_VIDEO_ERROR)<
  number,
  IVideoInPlaylist[],
  string
>()

export const deleteVideoAsync = createAsyncAction(DELETE_VIDEO, DELETE_VIDEO_SUCCESS, DELETE_VIDEO_ERROR)<
  number,
  number,
  string
>()

export const editTimeRangeAsync = createAsyncAction(
  EDIT_TIMERANGE_VIDEO,
  EDIT_TIMERANGE_VIDEO_SUCCESS,
  EDIT_TIMERANGE_VIDEO_ERROR,
)<IEditVideoTimeRangeRequest, IEditVideoTimeRangeRequest, string>()

export const videoActions = {
  getVideoAsync,
  deleteVideoAsync,
  editTimeRangeAsync,
}
