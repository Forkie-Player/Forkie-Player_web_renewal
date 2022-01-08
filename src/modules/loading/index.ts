import { createReducer } from 'typesafe-actions'
import { loadingActionTypes } from './actions'
import { TLoading_ACTION } from './types'

const initialState: boolean = false

const loadingReducer = createReducer<boolean, TLoading_ACTION>(initialState, {
  [loadingActionTypes.SET_LOADING]: () => true,
  [loadingActionTypes.SET_UNLOADING]: () => false,
})

export default loadingReducer
