import axios from 'axios'
import { Address } from './constants'
import { IAddVideoToPlaylistRequest, IChangeVideoOrderInPlaylistRequest } from './types'

export const getVideoList = async (id: number) => {
  try {
    const res = await axios.get(`${Address}/api/play/list/${id}`)
    return res.data.response
  } catch (err) {
    throw err
  }
}

export const addVideo = async (request: IAddVideoToPlaylistRequest) => {
  try {
    await axios.post(`${Address}/api/play/create`, {
      playlistId: request.playlistId,
      ...request.video,
    })
  } catch (err) {
    throw err
  }
}

export const deleteVideo = async (id: number) => {
  try {
    await axios.delete(`${Address}/api/play/delete/${id}`)
  } catch (err) {
    throw err
  }
}

export const changeOrder = async (request: IChangeVideoOrderInPlaylistRequest) => {
  try {
    await axios.put(`${Address}/api/play/edit/seq`, request)
  } catch (err) {
    throw err
  }
}

export const changeLapse = async (id: number, start: number, end: number) => {
  try {
    await axios.put(`${Address}/api/play/edit/time`, {
      id: id,
      start: start,
      end: end,
    })
  } catch (err) {
    throw err
  }
}
