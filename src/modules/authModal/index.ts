import { createReducer } from 'typesafe-actions'
import { authModalActionTypes } from './actions'
import { TAuthModal_Action } from './types'

const initialState = false

const authModal = createReducer<boolean, TAuthModal_Action>(initialState, {
  [authModalActionTypes.OPEN]: (state, action) => true,
  [authModalActionTypes.CLOSE]: (state, action) => false,
})

export default authModal
