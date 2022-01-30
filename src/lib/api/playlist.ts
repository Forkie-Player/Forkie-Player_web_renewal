import axios from 'axios'
import { Address } from './constants'
import {
  ICreatePlaylistRequest,
  TDeletePlaylistRequest,
  IDeletePlaylistSuccess,
  IGetPlaylistSuccess,
  IEditPlaylistTitleRequest,
  IEditPlaylistTitleSuccess,
  ICreatePlaylistSuccess,
} from './types'

export const getPlaylistApi = async () => {
  const res = await axios.get<IGetPlaylistSuccess>(`${Address}/api/playlist`)
  return res.data
}

export const deletePlaylist = async (request: TDeletePlaylistRequest) => {
  const res = await axios.delete<IDeletePlaylistSuccess>(`${Address}/api/playlist/delete/${request}`)
  return res.data
}

export const createPlaylist = async (obj: ICreatePlaylistRequest) => {
  const res = await axios.post<ICreatePlaylistSuccess>(`${Address}/api/playlist/create`, obj)
  return res.data
}

export const editPlaylistTitle = async (obj: IEditPlaylistTitleRequest) => {
  const res = await axios.put<IEditPlaylistTitleSuccess>(`${Address}/api/playlist/edit`, obj)
  return res.data
}
