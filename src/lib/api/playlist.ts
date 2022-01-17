import axios, { AxiosError } from 'axios'
import { IPlaylist } from '../../types'
import { Address } from './constants'
import {
  ICreatePlaylistRequest,
  TDeletePlaylistRequest,
  IDeletePlaylistSuccess,
  IGetPlaylistSuccess,
  IEditPlaylistTitleRequest,
  IEditPlaylistTitleSuccess,
} from './types'

export const getPlaylistApi = async (): Promise<IPlaylist[] | AxiosError> => {
  const res = await axios.get<IGetPlaylistSuccess>(`${Address}/api/playlist`)
  return res.data.response
}

export const deletePlaylist = async (request: TDeletePlaylistRequest) => {
  const res = await axios.delete<IDeletePlaylistSuccess>(`${Address}/api/playlist/delete/${request}`)
  return res.data
}

export const addPlaylist = async (obj: ICreatePlaylistRequest) => {
  const res = await axios.post(`${Address}/api/playlist/create`, obj)
  return res.data.response
}

export const editPlaylistTitle = async (obj: IEditPlaylistTitleRequest) => {
  const res = await axios.put<IEditPlaylistTitleSuccess>(`${Address}/api/playlist/edit`, obj)
  return res.data
}
