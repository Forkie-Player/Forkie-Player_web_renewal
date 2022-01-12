import { createReducer } from 'typesafe-actions'
import { searchResultActionTypes } from './actions'
import { TSearchResultType, TSearchResult_Action } from './types'

const initialState: TSearchResultType = {
  success: false,
  pending: false,
  error: null,
  items: [],
}

const searchResultReducer = createReducer<TSearchResultType, TSearchResult_Action>(initialState, {
  [searchResultActionTypes.GET_SEARCH_RESULT]: state => ({ ...state, error: null, success: false, pending: true }),
  [searchResultActionTypes.GET_SEARCH_RESULT_SUCCESS]: (state, action) => ({
    ...state,
    success: true,
    pending: false,
    items: action.payload,
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_FAILURE]: state => ({
    ...state,
    success: false,
    pending: false,
    error: 'error',
  }),
  [searchResultActionTypes.CLEAR_SEARCH_RESULT]: () => ({ ...initialState }),
})

export default searchResultReducer
