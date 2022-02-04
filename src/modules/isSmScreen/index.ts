import { createReducer } from 'typesafe-actions'
import { isSmScreenActionTypes } from './actions'
import { TIsSmScreen_ACTION } from './types'

const isSmScreenReducer = createReducer<boolean, TIsSmScreen_ACTION>(false, {
  [isSmScreenActionTypes.SET_IS_SMSCREEN]: () => true,
  [isSmScreenActionTypes.SET_IS_NOT_SMSCREEN]: () => false,
})

export default isSmScreenReducer
