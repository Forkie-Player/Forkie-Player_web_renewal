import { createAsyncAction } from 'typesafe-actions'
import { IVideo } from '../../types'

const GET_POPULAR_VIDEOS = 'popularVideos/GET_POPULAR_VIDEOS' as const
const GET_POPULAR_VIDEOS_SUCCESS = 'popularVideos/GET_POPULAR_VIDEOS_SUCCESS' as const
const GET_POPULAR_VIDEOS_ERROR = 'popularVideos/GET_POPULAR_VIDEOS_ERROR' as const

export const popularVideosTypes = {
  GET_POPULAR_VIDEOS,
  GET_POPULAR_VIDEOS_SUCCESS,
  GET_POPULAR_VIDEOS_ERROR,
}

export const getPopularVideoAsync = createAsyncAction(
  GET_POPULAR_VIDEOS,
  GET_POPULAR_VIDEOS_SUCCESS,
  GET_POPULAR_VIDEOS_ERROR,
)<undefined, IVideo[], string>()

export const popularVideoActions = {
  getPopularVideoAsync,
}
