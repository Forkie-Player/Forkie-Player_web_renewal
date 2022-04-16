import { createAction, createAsyncAction } from 'typesafe-actions'
import { IDeletePlaylistRequest, IEditVideoTimeRangeRequest, ISeqListItem } from '../../lib/api/types'
import { IVideoInPlaylist } from '../../types'
import { IChangeVideoOrderAsyncRequest, IDeleteVideoSuccess } from './types'

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
const UPDATE_CURRENT_VIDEO = 'video/UPDATE_CURRENT_VIDEO' as const

const CHANGE_VIDEO_ORDER = 'video/CHANGE_VIDEO_ORDER' as const
const CHANGE_VIDEO_ORDER_SUCCESS = 'video/CHANGE_VIDEO_ORDER_SUCCESS' as const
const CHANGE_VIDEO_ORDER_ERROR = 'video/CHANGE_VIDEO_ORDER_ERROR' as const

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
  UPDATE_CURRENT_VIDEO,
  CHANGE_VIDEO_ORDER,
  CHANGE_VIDEO_ORDER_SUCCESS,
  CHANGE_VIDEO_ORDER_ERROR,
}

// 액션 생성 함수
export const getVideoAsync = createAsyncAction(GET_VIDEO, GET_VIDEO_SUCCESS, GET_VIDEO_ERROR)<
  number,
  { items: IVideoInPlaylist[]; playlistId: number },
  string
>()

export const deleteVideoAsync = createAsyncAction(DELETE_VIDEO, DELETE_VIDEO_SUCCESS, DELETE_VIDEO_ERROR)<
  IDeletePlaylistRequest,
  IDeleteVideoSuccess,
  string
>()

export const editTimeRangeAsync = createAsyncAction(
  EDIT_TIMERANGE_VIDEO,
  EDIT_TIMERANGE_VIDEO_SUCCESS,
  EDIT_TIMERANGE_VIDEO_ERROR,
)<IEditVideoTimeRangeRequest, IEditVideoTimeRangeRequest, string>()

export const updateCurrentVideo = createAction(UPDATE_CURRENT_VIDEO)<IVideoInPlaylist>()

export const changeVideoOrderAsync = createAsyncAction(
  CHANGE_VIDEO_ORDER,
  CHANGE_VIDEO_ORDER_SUCCESS,
  CHANGE_VIDEO_ORDER_ERROR,
)<IChangeVideoOrderAsyncRequest, ISeqListItem[], string>()

export const videoActions = {
  getVideoAsync,
  deleteVideoAsync,
  editTimeRangeAsync,
  updateCurrentVideo,
  changeVideoOrderAsync,
}
