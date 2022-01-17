import { AxiosError } from 'axios'
import { createAction, createAsyncAction } from 'typesafe-actions'
import {
  IAddVideoToPlaylistRequest,
  ICreatePlaylistRequest,
  IEditPlaylistTitleRequest,
  TDeletePlaylistRequest,
} from '../../lib/api/types'
import { IPlaylist } from '../../types'
import { IAddVideoReturn } from './types'

//액션 타입
const ADD_PLAYLIST = 'playlist/ADD_PLAYLIST' as const
const ADD_PLAYLIST_SUCCESS = 'playlist/ADD_PLAYLIST_SUCCESS' as const
const ADD_PLAYLIST_ERROR = 'playlist/ADD_PLAYLIST_ERROR' as const
const GET_PLAYLIST = 'playlist/GET_PLAYLIST' as const
const GET_PLAYLIST_SUCESS = 'playlist/GET_PLAYLIST_SUCESS' as const
const GET_PLAYLIST_ERROR = 'playlist/GET_PLAYLIST_ERROR' as const
const CLEAR_THUMBNAIL = 'playlist/CLEAR_THUMBNAIL' as const
const SET_THUMBNAIL = 'playlist/SET_THUMBNAIL' as const

const ADD_VIDEO = 'playlist/ADD_VIDEO' as const
const ADD_VIDEO_SUCCESS = 'playlist/ADD_VIDEO_SUCCESS' as const
const ADD_VIDEO_ERROR = 'playlist/ADD_VIDEO_ERROR' as const

const DELETE_PLAYLIST = 'playlist/DELETE_PLAYLSIT' as const
const DELETE_PLAYLIST_SUCCESS = 'playlist/DELETE_PLAYLSIT_SUCCESS' as const
const DELETE_PLAYLIST_ERROR = 'playlist/DELETE_PLAYLSIT_ERROR' as const

const EDIT_PLAYLIST_TITLE = 'playlist/EDIT_PLAYLIST_TITLE' as const
const EDIT_PLAYLIST_TITLE_SUCCESS = 'playlist/EDIT_PLAYLIST_TITLE_SUCCESS' as const
const EDIT_PLAYLIST_TITLE_ERROR = 'playlist/EDIT_PLAYLIST_TITLE_ERROR' as const

export const playlistActionTypes = {
  ADD_PLAYLIST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_ERROR,
  GET_PLAYLIST,
  GET_PLAYLIST_SUCESS,
  GET_PLAYLIST_ERROR,
  CLEAR_THUMBNAIL,
  SET_THUMBNAIL,
  ADD_VIDEO,
  ADD_VIDEO_SUCCESS,
  ADD_VIDEO_ERROR,
  DELETE_PLAYLIST,
  DELETE_PLAYLIST_SUCCESS,
  DELETE_PLAYLIST_ERROR,
  EDIT_PLAYLIST_TITLE,
  EDIT_PLAYLIST_TITLE_SUCCESS,
  EDIT_PLAYLIST_TITLE_ERROR,
}

//액션 생성 함수
export const addPlaylistAsync = createAsyncAction(ADD_PLAYLIST, ADD_PLAYLIST_SUCCESS, ADD_PLAYLIST_ERROR)<
  ICreatePlaylistRequest,
  IPlaylist,
  string
>()
export const clearThumbnail = createAction(CLEAR_THUMBNAIL, (id: number) => id)()
export const setThumbnail = createAction(SET_THUMBNAIL, (id: number, thumbnail: string) => ({ id, thumbnail }))()
export const getPlaylistAsync = createAsyncAction(GET_PLAYLIST, GET_PLAYLIST_SUCESS, GET_PLAYLIST_ERROR)<
  undefined,
  IPlaylist[],
  AxiosError
>()
export const addVideoAsync = createAsyncAction(ADD_VIDEO, ADD_VIDEO_SUCCESS, ADD_VIDEO_ERROR)<
  IAddVideoToPlaylistRequest,
  IAddVideoReturn,
  string
>()
export const deletePlaylistAsync = createAsyncAction(DELETE_PLAYLIST, DELETE_PLAYLIST_SUCCESS, DELETE_PLAYLIST_ERROR)<
  TDeletePlaylistRequest,
  number,
  string
>()

export const editPlaylistTitleAsync = createAsyncAction(
  EDIT_PLAYLIST_TITLE,
  EDIT_PLAYLIST_TITLE_SUCCESS,
  EDIT_PLAYLIST_TITLE_ERROR,
)<IEditPlaylistTitleRequest, IEditPlaylistTitleRequest, string>()

export const playlistActions = {
  addPlaylistAsync,
  clearThumbnail,
  setThumbnail,
  getPlaylistAsync,
  addVideoAsync,
  deletePlaylistAsync,
  editPlaylistTitleAsync,
}
