import { createReducer } from 'typesafe-actions'
import { searchResultActionTypes } from './actions'
import { TSearchResultType, TSearchResult_Action } from './types'

const initialState: TSearchResultType = {
  pending: false,
  error: null,
  items: [],
}

const searchResultReducer = createReducer<TSearchResultType, TSearchResult_Action>(initialState, {
  [searchResultActionTypes.GET_SEARCH_RESULT]: state => ({ ...state, pending: true }),
  [searchResultActionTypes.GET_SEARCH_RESULT_SUCCESS]: (state, action) => ({
    ...state,
    pending: false,
    items: action.payload,
  }),
  [searchResultActionTypes.GET_SEARCH_RESULT_FAILURE]: state => ({ ...state, pending: false, error: 'error' }),
  [searchResultActionTypes.CLEAR_SEARCH_RESULT]: () => ({ ...initialState }),
})

export default searchResultReducer
