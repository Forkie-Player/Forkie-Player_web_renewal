import popularVideosReducer from '.'
import { TPopularVideoType } from './types'
import * as actions from './actions'
import { temp_videos } from '../../lib/tempData'

const initialState: TPopularVideoType = {
  success: false,
  pending: false,
  error: null,
  items: [],
}

describe('test popularVideosReducer', () => {
  let state = initialState
  test('dispacth GET_POPULAR_VIDEOS', () => {
    state = popularVideosReducer(initialState, actions.getPopularVideoAsync.request())
    expect(state).toEqual({
      ...initialState,
      pending: true,
    })
  })
  test('dispatch GET_POPULAR_VIDEOS_SUCCESS', () => {
    state = popularVideosReducer(state, actions.getPopularVideoAsync.success(temp_videos))
    expect(state).toEqual({
      ...state,
      success: true,
      pending: false,
      error: null,
      items: temp_videos,
    })
  })
  test('dispatch GET_SEARCH_RESULT_FAILURE', () => {
    state = popularVideosReducer(state, actions.getPopularVideoAsync.failure('test'))
    expect(state).toEqual({
      ...state,
      success: false,
      pending: false,
      error: 'test',
    })
  })
})
