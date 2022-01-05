import { ISearchResult } from '../types'
import { TSearchResult_Action } from './moduleTypes'

//액션 타입
const SET_SEARCH_RESULT = 'searchResult/SET_SEARCH_RESULT'
const CLEAR_SEARCH_RESULT = 'searchResult/CLEAR_SEARCH_RESULT'

//액션 함수
export const setSearchResult = (searchResult: ISearchResult[]) => ({ type: SET_SEARCH_RESULT, searchResult })
export const clearSearchResult = () => ({ type: CLEAR_SEARCH_RESULT, searchResult: [] })

const initialState: ISearchResult[] = []

export default function searchResult(state = initialState, action: TSearchResult_Action) {
  switch (action.type) {
    case SET_SEARCH_RESULT:
      return action.searchResult
    case CLEAR_SEARCH_RESULT:
      return []
    default:
      return state
  }
}
