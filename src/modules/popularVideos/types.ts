import { ActionType } from 'typesafe-actions'
import { IVideo } from '../../types'
import { IAsyncState } from '../moduleTypes'
import { popularVideoActions } from './actions'

export type TPopularVideo_Action = ActionType<typeof popularVideoActions>
export type TPopularVideoType = IAsyncState & { items: IVideo[] }
