import { ActionType } from 'typesafe-actions'
import { isFirstConstants } from '../../lib/constants'
import { isFirstActions } from './actions'

export interface IIsFirst {
  [isFirstConstants.P_FIRST]: typeof isFirstConstants.FIRST | typeof isFirstConstants.NOTFIRST
  [isFirstConstants.V_FIRST]: typeof isFirstConstants.FIRST | typeof isFirstConstants.NOTFIRST
}

export type TIsFirst_Action = ActionType<typeof isFirstActions>
