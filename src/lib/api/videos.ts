import axios from 'axios'
import { Address } from './constants'
import {
  IAddVideoToPlaylistRequest,
  IAddVideoToPlaylistSuccess,
  IChangeVideoOrderInPlaylistRequest,
  IChangeVIdeoOrderInPlaylistSuccess,
  IDeleteVideoSuccess,
  IEditVideoTimeRangeRequest,
  IEditVideoTimeRangeSuccess,
  IGetPopularVideoSuccess,
  IGetVideoListSuccess,
} from './types'

import { doc, getDoc } from 'firebase/firestore'
import { db } from '../../firebaseInit'

export const getVideoList = async (id: number) => {
  const res = await axios.get<IGetVideoListSuccess>(`${Address}/api/play/${id}`)
  console.log(res)
  return res.data
}

export const addVideo = async (request: IAddVideoToPlaylistRequest) => {
  await axios.post<IAddVideoToPlaylistSuccess>(`${Address}/api/play`, {
    playlistId: request.playlistId,
    ...request.video,
  })
  return { id: request.playlistId, thumbnail: request.video.thumbnail }
}

export const deleteVideo = async (id: number) => {
  const res = await axios.delete<IDeleteVideoSuccess>(`${Address}/api/play/delete/${id}`)
  return res.data
}

export const changeVideoOrder = async (request: IChangeVideoOrderInPlaylistRequest) => {
  const res = await axios.put<IChangeVIdeoOrderInPlaylistSuccess>(`${Address}/api/play/edit/seq`, request)
  return res.data
}

export const editVideoTimeRange = async (request: IEditVideoTimeRangeRequest) => {
  const res = await axios.put<IEditVideoTimeRangeSuccess>(`${Address}/api/play/edit/time`, request)
  return res.data
}

export const getPopularVideos = async () => {
  const docRef = doc(db, 'popular', 'popular')
  const docSnap = await getDoc(docRef)

  const docData = docSnap.data() as IGetPopularVideoSuccess
  return docData
}
