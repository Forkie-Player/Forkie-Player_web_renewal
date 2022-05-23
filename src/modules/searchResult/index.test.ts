import searchResultReducer from '.'
import { temp_searchResult } from '../../lib/tempData'
import { clearSearchResult, getSearchResult } from './actions'
import { TSearchResultType } from './types'

const initialState: TSearchResultType = {
  success: false,
  pending: false,
  error: null,
  items: [],
}

describe('test searchResultReducer', () => {
  test('GET_SEARCH_RESULT', () => {
    const state = searchResultReducer(initialState, getSearchResult.request('test'))
    expect(state).toEqual({
      ...initialState,
      pending: true,
    })
  })
  test('GET_SEARCH_RESULT_SUCCESS', () => {
    const state = searchResultReducer(initialState, getSearchResult.success(temp_searchResult))
    expect(state).toEqual({
      ...initialState,
      success: true,
      pending: false,
      items: temp_searchResult,
    })
  })
  test('GET_SEARCH_RESULT_FAILURE', () => {
    const state = searchResultReducer(initialState, getSearchResult.failure('test'))
    expect(state).toEqual({
      ...initialState,
      success: false,
      pending: false,
      error: 'test',
    })
  })
  test('CLEAR_SEARCH_RESULT', () => {
    const state = searchResultReducer(initialState, clearSearchResult())
    expect(state).toEqual(initialState)
  })
})
