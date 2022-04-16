import axios from 'axios'
import { Address } from './constants'
import {
  IAddVideoToPlaylistRequest,
  IAddVideoToPlaylistSuccess,
  IChangeVideoOrderInPlaylistRequest,
  IChangeVIdeoOrderInPlaylistSuccess,
  IDeletePlaylistRequest,
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
  return res.data
}

export const addVideo = async (request: IAddVideoToPlaylistRequest) => {
  await axios.post<IAddVideoToPlaylistSuccess>(`${Address}/api/play`, {
    playlistId: request.playlistId,
    ...request.video,
  })
  return { id: request.playlistId, thumbnail: request.video.thumbnail }
}

export const deleteVideo = async (request: IDeletePlaylistRequest) => {
  await axios.delete<IDeleteVideoSuccess>(`${Address}/api/play`, {
    data: request,
  })
}

export const changeVideoOrder = async (request: IChangeVideoOrderInPlaylistRequest) => {
  await axios.patch<IChangeVIdeoOrderInPlaylistSuccess>(`${Address}/api/play/sequence`, request)
}

export const editVideoTimeRange = async (request: IEditVideoTimeRangeRequest) => {
  await axios.patch<IEditVideoTimeRangeSuccess>(`${Address}/api/play/time`, request)
}

export const getPopularVideos = async () => {
  const docRef = doc(db, 'popular', 'popular')
  const docSnap = await getDoc(docRef)

  const docData = docSnap.data() as IGetPopularVideoSuccess
  return docData
}
