import { createReducer } from 'typesafe-actions'
import { searchPlatforms } from '../../lib/constants'
import { searchResultActionTypes } from './actions'
import { TSearchResultType, TSearchResult_Action } from './types'

const initialState: TSearchResultType = {
  YOUTUBE: {
    success: false,
    pending: false,
    error: null,
    items: [],
  },
  TWITCH: {
    success: false,
    pending: false,
    error: null,
    items: [],
  },
  DAILYMOTION: {
    success: false,
    pending: false,
    error: null,
    items: [],
  },
}

const searchResultReducer = createReducer<TSearchResultType, TSearchResult_Action>(initialState, {
  [searchResultActionTypes.GET_SEARCH_RESULT]: state => ({ ...state }),
  [searchResultActionTypes.GET_SEARCH_RESULT_SUCCESS]: (state, action) => {
    searchPlatforms.forEach(platform => {
      state[platform].items = []
    })
    return state
  },
  [searchResultActionTypes.GET_SEARCH_RESULT_YOUTUBE]: state => ({
    ...state,
    youtube: {
      ...state.YOUTUBE,
      pending: true,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_YOUTUBE_SUCCESS]: (state, action) => ({
    ...state,
    youtube: {
      ...state.YOUTUBE,
      success: true,
      pending: false,
      items: action.payload,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_YOUTUBE_FAILURE]: (state, action) => ({
    ...state,
    youtube: {
      ...state.YOUTUBE,
      success: false,
      pending: false,
      error: action.payload,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_TWITCH]: state => ({
    ...state,
    twitch: {
      ...state.TWITCH,
      pending: true,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_TWITCH_SUCCESS]: (state, action) => ({
    ...state,
    twitch: {
      ...state.TWITCH,
      success: true,
      pending: false,
      items: action.payload,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_TWITCH_FAILURE]: (state, action) => ({
    ...state,
    twitch: {
      ...state.TWITCH,
      success: false,
      pending: false,
      error: action.payload,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_DAILYMOTION]: state => ({
    ...state,
    dailymotion: {
      ...state.DAILYMOTION,
      pending: true,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_DAILYMOTION_SUCCESS]: (state, action) => ({
    ...state,
    dailymotion: {
      ...state.DAILYMOTION,
      success: true,
      pending: false,
      items: action.payload,
    },
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_DAILYMOTION_FAILURE]: (state, action) => ({
    ...state,
    dailymotion: {
      ...state.DAILYMOTION,
      success: false,
      pending: false,
      error: action.payload,
    },
  }),
  [searchResultActionTypes.CLEAR_SEARCH_RESULT]: () => ({ ...initialState }),
})

export default searchResultReducer
