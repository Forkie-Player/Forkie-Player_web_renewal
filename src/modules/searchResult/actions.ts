import { createAction, createAsyncAction } from 'typesafe-actions'
import { IVideo, SearchPlatformType } from '../../types'

//액션 타입
const GET_SEARCH_RESULT = 'searchResult/GET_SEARCH_RESULT' as const
const GET_SEARCH_RESULT_SUCCESS = 'searchResult/GET_SEARCH_RESULT_SUCCESS' as const
const GET_SEARCH_RESULT_FAILURE = 'searchResult/GET_SEARCH_RESULT_FAILURE' as const
const CLEAR_SEARCH_RESULT = 'searchResult/CLEAR_SEARCH_RESULT' as const

const GET_SEARCH_RESULT_YOUTUBE = 'searchResult/GET_SEARCH_RESULT/youtube' as const
const GET_SEARCH_RESULT_YOUTUBE_SUCCESS = 'searchResult/GET_SEARCH_RESULT/youtube_SUCCESS' as const
const GET_SEARCH_RESULT_YOUTUBE_FAILURE = 'searchResult/GET_SEARCH_RESULT/youtube_FAILURE' as const
const GET_SEARCH_RESULT_TWITCH = 'searchResult/GET_SEARCH_RESULT/twitch' as const
const GET_SEARCH_RESULT_TWITCH_SUCCESS = 'searchResult/GET_SEARCH_RESULT/twitch_SUCCESS' as const
const GET_SEARCH_RESULT_TWITCH_FAILURE = 'searchResult/GET_SEARCH_RESULT/twitch_FAILURE' as const
const GET_SEARCH_RESULT_DAILYMOTION = 'searchResult/GET_SEARCH_RESULT/dailymotion' as const
const GET_SEARCH_RESULT_DAILYMOTION_SUCCESS = 'searchResult/GET_SEARCH_RESULT/dailymotion_SUCCESS' as const
const GET_SEARCH_RESULT_DAILYMOTION_FAILURE = 'searchResult/GET_SEARCH_RESULT/dailymotion_FAILURE' as const
const GET_SEARCH_RESULT_VIMEO = 'searchResult/GET_SEARCH_RESULT/vimeo' as const
const GET_SEARCH_RESULT_VIMEO_SUCCESS = 'searchResult/GET_SEARCH_RESULT/vimeo_SUCCESS' as const
const GET_SEARCH_RESULT_VIMEO_FAILURE = 'searchResult/GET_SEARCH_RESULT/vimeo_FAILURE' as const

export const searchResultActionTypes = {
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_FAILURE,
  CLEAR_SEARCH_RESULT,
  GET_SEARCH_RESULT_YOUTUBE,
  GET_SEARCH_RESULT_YOUTUBE_SUCCESS,
  GET_SEARCH_RESULT_YOUTUBE_FAILURE,
  GET_SEARCH_RESULT_TWITCH,
  GET_SEARCH_RESULT_TWITCH_SUCCESS,
  GET_SEARCH_RESULT_TWITCH_FAILURE,
  GET_SEARCH_RESULT_DAILYMOTION,
  GET_SEARCH_RESULT_DAILYMOTION_SUCCESS,
  GET_SEARCH_RESULT_DAILYMOTION_FAILURE,
  GET_SEARCH_RESULT_VIMEO,
  GET_SEARCH_RESULT_VIMEO_SUCCESS,
  GET_SEARCH_RESULT_VIMEO_FAILURE,
}

//액션 함수
export const getSearchResult = createAsyncAction(
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_FAILURE,
)<{ search: string; platforms: Array<SearchPlatformType> }, void, string>()
export const clearSearchResult = createAction(CLEAR_SEARCH_RESULT)()

export const getSearchResultYoutube = createAsyncAction(
  GET_SEARCH_RESULT_YOUTUBE,
  GET_SEARCH_RESULT_YOUTUBE_SUCCESS,
  GET_SEARCH_RESULT_YOUTUBE_FAILURE,
)<string, IVideo[], string>()
export const getSearchResultTwitch = createAsyncAction(
  GET_SEARCH_RESULT_TWITCH,
  GET_SEARCH_RESULT_TWITCH_SUCCESS,
  GET_SEARCH_RESULT_TWITCH_FAILURE,
)<string, IVideo[], string>()
export const getSearchResultDailymotion = createAsyncAction(
  GET_SEARCH_RESULT_DAILYMOTION,
  GET_SEARCH_RESULT_DAILYMOTION_SUCCESS,
  GET_SEARCH_RESULT_DAILYMOTION_FAILURE,
)<string, IVideo[], string>()
export const getSearchResultVimeo = createAsyncAction(
  GET_SEARCH_RESULT_VIMEO,
  GET_SEARCH_RESULT_VIMEO_SUCCESS,
  GET_SEARCH_RESULT_VIMEO_FAILURE,
)<string, IVideo[], string>()

export const searchResultActions = {
  getSearchResult,
  getSearchResultYoutube,
  getSearchResultTwitch,
  getSearchResultDailymotion,
  getSearchResultVimeo,
  clearSearchResult,
}
