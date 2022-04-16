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
  await axios.delete<IDeletePlaylistSuccess>(`${Address}/api/playlist`, {
    data: { playlistId: request },
  })
}

export const createPlaylist = async (obj: ICreatePlaylistRequest) => {
  await axios.post<ICreatePlaylistSuccess>(`${Address}/api/playlist`, obj)
}

export const editPlaylistTitle = async (obj: IEditPlaylistTitleRequest) => {
  await axios.patch<IEditPlaylistTitleSuccess>(`${Address}/api/playlist`, obj)
}
