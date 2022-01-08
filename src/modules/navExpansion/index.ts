import { createReducer } from 'typesafe-actions'
import { navExpansionActionTypes } from './actions'
import { TNavExpansion_Action } from './types'

const initialState: boolean = true

const navExpansionReducer = createReducer<boolean, TNavExpansion_Action>(initialState, {
  [navExpansionActionTypes.SET_NAV_CLOSE]: () => false,
  [navExpansionActionTypes.SET_NAV_OPEN]: () => true,
})

export default navExpansionReducer
