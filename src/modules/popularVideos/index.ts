import { createReducer } from 'typesafe-actions'
import { popularVideosTypes } from './actions'
import { TPopularVideoType, TPopularVideo_Action } from './types'

const initialState: TPopularVideoType = {
  success: false,
  pending: false,
  error: null,
  items: [],
}

const popularVideosReducer = createReducer<TPopularVideoType, TPopularVideo_Action>(initialState, {
  [popularVideosTypes.GET_POPULAR_VIDEOS]: (state, action) => ({
    ...state,
    success: false,
    pending: true,
    error: null,
  }),
  [popularVideosTypes.GET_POPULAR_VIDEOS_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    error: null,
    items: action.payload,
  }),
  [popularVideosTypes.GET_POPULAR_VIDEOS_ERROR]: (state, action) => ({
    ...state,
    success: false,
    pending: false,
    error: action.payload,
  }),
})

export default popularVideosReducer
