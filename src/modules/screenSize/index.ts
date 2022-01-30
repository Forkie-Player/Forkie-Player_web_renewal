import { createReducer } from 'typesafe-actions'
import { screenSizeActionTypes } from './actions'
import { TScreenSize, TScreenSize_ACTION } from './types'

const initialState: TScreenSize = 'lg'

const screenSizeReducer = createReducer<TScreenSize, TScreenSize_ACTION>(initialState, {
  [screenSizeActionTypes.SET_SCREEN_SIZE]: (_, action) => action.payload,
})

export default screenSizeReducer
