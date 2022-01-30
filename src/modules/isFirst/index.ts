import { createReducer } from 'typesafe-actions'
import { isFirstConstants } from '../../lib/constants'
import { setCookie } from '../../lib/utils/cookie'
import { isFirstActionTypes } from './actions'
import { IIsFirst, TIsFirst_Action } from './types'

const initialState: IIsFirst = {
  [isFirstConstants.P_FIRST]: isFirstConstants.NOTFIRST,
  [isFirstConstants.V_FIRST]: isFirstConstants.NOTFIRST,
  [isFirstConstants.ADD_FIRST]: isFirstConstants.NOTFIRST,
}

const isFirstReducer = createReducer<IIsFirst, TIsFirst_Action>(initialState, {
  [isFirstActionTypes.GET_ISFIRST]: (state, action) => action.payload,
  [isFirstActionTypes.CLEAR_ISFIRST]: (state, action) => {
    setCookie(`@${action.payload}`, isFirstConstants.NOTFIRST)
    return { ...state, [action.payload]: isFirstConstants.NOTFIRST }
  },
})

export default isFirstReducer
