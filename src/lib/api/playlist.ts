import axios, { AxiosError } from 'axios'
import { IPlaylist } from '../../types'
import { Address } from './constants'
import { ICreatePlaylistRequest, IGetPlaylistSuccess, IUpdatePlaylistTitleRequest } from './types'

export const getPlaylistApi = async (): Promise<IPlaylist[] | AxiosError> => {
  const res = await axios.get<IGetPlaylistSuccess>(`${Address}/api/playlist`)
  return res.data.response
}

export const deletePlaylist = async (id: number) => {
  try {
    await axios.delete(`${Address}/api/playlist/delete/${id}`)
  } catch (err) {
    if (axios.isAxiosError(err) && err.response !== undefined) {
      throw err.response.data
    }
  }
}

export const addPlaylist = async (obj: ICreatePlaylistRequest) => {
  const res = await axios.post(`${Address}/api/playlist/create`, obj)
  return res.data.response
}

export const editPlaylist = async (obj: IUpdatePlaylistTitleRequest) => {
  try {
    await axios.put(`${Address}/api/playlist/edit`, obj)
  } catch (err) {
    if (axios.isAxiosError(err) && err.response !== undefined) {
      throw err.response.data
    }
  }
}
