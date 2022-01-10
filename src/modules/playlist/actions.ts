import { AxiosError } from 'axios'
import { createAction, createAsyncAction } from 'typesafe-actions'
import { ICreatePlaylistRequest } from '../../lib/api/types'
import { IPlaylist } from '../../types'

//액션 타입
const ADD_PLAYLIST = 'playlist/ADD_PLAYLIST' as const
const ADD_PLAYLIST_SUCCESS = 'playlist/ADD_PLAYLIST_SUCCESS' as const
const ADD_PLAYLIST_ERROR = 'playlist/ADD_PLAYLIST_ERROR' as const
const GET_PLAYLIST = 'playlist/GET_PLAYLIST' as const
const GET_PLAYLIST_SUCESS = 'playlist/GET_PLAYLIST_SUCESS' as const
const GET_PLAYLIST_ERROR = 'playlist/GET_PLAYLIST_ERROR' as const
const CLEAR_THUMBNAIL = 'playlist/CLEAR_THUMBNAIL' as const
const SET_THUMBNAIL = 'playlist/SET_THUMBNAIL' as const

export const playlistActionTypes = {
  ADD_PLAYLIST,
  ADD_PLAYLIST_SUCCESS,
  ADD_PLAYLIST_ERROR,
  GET_PLAYLIST,
  GET_PLAYLIST_SUCESS,
  GET_PLAYLIST_ERROR,
  CLEAR_THUMBNAIL,
  SET_THUMBNAIL,
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

export const playlistActions = {
  addPlaylistAsync,
  clearThumbnail,
  setThumbnail,
  getPlaylistAsync,
}
