import { ActionType } from 'typesafe-actions'
import { screenSizeActions } from './actions'

//screenSize
export type TScreenSize = string
export type TScreenSize_ACTION = ActionType<typeof screenSizeActions>
