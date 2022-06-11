import { temp_searchResult } from '../../lib/tempData'
import { clearSearchResult, getSearchResult, searchResultActionTypes } from './actions'

/*
describe('getSearchResult test', () => {
  test('should dispatch GET_SEARCH_RESULT properly', () => {
    const action = getSearchResult.request({ search: 'test', platforms: ['youtube'] })
    expect(action).toEqual({
      type: searchResultActionTypes.GET_SEARCH_RESULT,
      payload: 'test',
    })
  })
  test('should dispatch GET_SEARCH_RESULT_SUCCESS properly', () => {
    const action = getSearchResult.success(temp_searchResult)
    expect(action).toEqual({
      type: searchResultActionTypes.GET_SEARCH_RESULT_SUCCESS,
      payload: temp_searchResult,
    })
  })
  test('should dispatch GET_SEARCH_RESULT_FAILURE properly', () => {
    const action = getSearchResult.failure('test')
    expect(action).toEqual({
      type: searchResultActionTypes.GET_SEARCH_RESULT_FAILURE,
      payload: 'test',
    })
  })
})

describe('clearSearchResult', () => {
  test('should dispatch CLEAR_SEARCH_RESULT properly', () => {
    const action = clearSearchResult()
    expect(action).toEqual({
      type: searchResultActionTypes.CLEAR_SEARCH_RESULT,
    })
  })
})
*/
