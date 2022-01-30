import { createAction, createAsyncAction } from 'typesafe-actions'
import { IVideo } from '../../types'

//액션 타입
const GET_SEARCH_RESULT = 'searchResult/GET_SEARCH_RESULT' as const
const GET_SEARCH_RESULT_SUCCESS = 'searchResult/GET_SEARCH_RESULT_SUCCESS' as const
const GET_SEARCH_RESULT_FAILURE = 'searchResult/GET_SEARCH_RESULT_FAILURE' as const
const CLEAR_SEARCH_RESULT = 'searchResult/CLEAR_SEARCH_RESULT' as const

export const searchResultActionTypes = {
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_FAILURE,
  CLEAR_SEARCH_RESULT,
}

//액션 함수
export const getSearchResult = createAsyncAction(
  GET_SEARCH_RESULT,
  GET_SEARCH_RESULT_SUCCESS,
  GET_SEARCH_RESULT_FAILURE,
)<string, IVideo[], string>()
export const clearSearchResult = createAction(CLEAR_SEARCH_RESULT)()

export const searchResultActions = {
  getSearchResult,
  clearSearchResult,
}
