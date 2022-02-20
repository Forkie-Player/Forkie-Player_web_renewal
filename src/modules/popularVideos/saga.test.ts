import * as sagas from './saga'
import * as actions from './actions'
import * as apis from '../../lib/api/videos'
import { call, put } from 'redux-saga/effects'
import { temp_popularVideo, temp_popularVideo_parsed } from '../../lib/tempData'
import handleSagaError from '../handleSagaError'
jest.mock('../handleSagaError')
jest.mock('../../lib/api/videos', () => ({
  ...jest.requireActual('../../lib/api/videos'),
  getPopularVideos: jest.fn(),
}))

describe('test getPopularVideoSaga', () => {
  test('should yield put properly', () => {
    const generator = sagas.getPopularVideoSaga()

    expect(generator.next().value).toEqual(call(apis.getPopularVideos))
    expect(generator.next({ popular: temp_popularVideo }).value).toEqual(
      put(actions.getPopularVideoAsync.success(temp_popularVideo_parsed)),
    )
  })
  test('when api fail, should call handleSagaError', () => {
    const generator = sagas.getPopularVideoSaga()

    expect(generator.next().value).toEqual(call(apis.getPopularVideos))

    generator.throw(Error('test'))
    expect(handleSagaError).toHaveBeenCalled()
    expect(handleSagaError).toBeCalledWith(Error('test'), actions.getPopularVideoAsync.failure)
  })
})
