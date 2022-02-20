import { createAsyncAction } from 'typesafe-actions'
import { IVideo } from '../../types'

const GET_POPULAR_VIDEOS = 'popularVideos/GET_POPULAR_VIDEOS' as const
const GET_POPULAR_VIDEOS_SUCCESS = 'popularVideos/GET_POPULAR_VIDEOS_SUCCESS' as const
const GET_SEARCH_RESULT_FAILURE = 'popularVideos/GET_SEARCH_RESULT_FAILURE' as const

export const popularVideosTypes = {
  GET_POPULAR_VIDEOS,
  GET_POPULAR_VIDEOS_SUCCESS,
  GET_SEARCH_RESULT_FAILURE,
}

export const getPopularVideoAsync = createAsyncAction(
  GET_POPULAR_VIDEOS,
  GET_POPULAR_VIDEOS_SUCCESS,
  GET_SEARCH_RESULT_FAILURE,
)<undefined, IVideo[], string>()

export const popularVideoActions = {
  getPopularVideoAsync,
}
