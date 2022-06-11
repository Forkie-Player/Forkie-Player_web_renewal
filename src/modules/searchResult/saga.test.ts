import { call, put } from 'redux-saga/effects'
import * as searchApi from '../../lib/api/search'
import { temp_searchResult } from '../../lib/tempData'
import handleSagaError from '../handleSagaError'
import { getSearchResult } from './actions'
import * as searchResultSaga from './saga'

jest.mock('../handleSagaError')

/*
describe('test getSearchResultSaga', () => {
  let getSearchResultSaga: Generator

  beforeEach(() => {
    getSearchResultSaga = searchResultSaga.getSearchResultSaga(
      getSearchResult.request({ search: 'test', platforms: ['youtube'] }),
    )
  })

  test('saga flow properly', () => {
    expect(getSearchResultSaga.next().value).toEqual(call(searchApi.getSearchResultApi, 'test'))
    expect(getSearchResultSaga.next(temp_searchSuccess).value).toEqual(put(getSearchResult.success(temp_searchResult)))
  })

  test('when api throw error, call handleSagaError', () => {
    expect(getSearchResultSaga.next().value).toEqual(call(searchApi.getSearchResultApi, 'test'))
    getSearchResultSaga.throw(Error('test'))

    expect(handleSagaError).toHaveBeenCalled()
    expect(handleSagaError).toBeCalledWith(Error('test'), getSearchResult.failure)
  })
})
*/
