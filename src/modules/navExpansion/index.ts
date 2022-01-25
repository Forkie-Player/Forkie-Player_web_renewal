import { createReducer } from 'typesafe-actions'
import { setCookie } from '../../lib/utils/cookie'
import { navExpansionActionTypes } from './actions'
import { TNavExpansion_Action } from './types'

const initialState: boolean = true

const navExpansionReducer = createReducer<boolean, TNavExpansion_Action>(initialState, {
  [navExpansionActionTypes.SET_NAV_CLOSE]: () => {
    setCookie('@navExpansion', 'close')
    return false
  },
  [navExpansionActionTypes.SET_NAV_OPEN]: () => {
    setCookie('@navExpansion', 'open')
    return true
  },
  [navExpansionActionTypes.SET_NAV_STATE]: (state, action) => {
    setCookie('@navExpansion', action.payload)
    if (action.payload === 'open') {
      return true
    } else {
      return false
    }
  },
})

export default navExpansionReducer
