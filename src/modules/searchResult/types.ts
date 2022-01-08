import { ActionType } from 'typesafe-actions'
import { IVideo } from '../../types'
import { IAsyncState } from '../moduleTypes'
import { searchResultActions } from './actions'

export type TSearchResult_Action = ActionType<typeof searchResultActions>

export type TSearchResultType = IAsyncState & { items: IVideo[] }
