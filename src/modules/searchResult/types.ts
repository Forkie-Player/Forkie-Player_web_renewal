import { ActionType } from 'typesafe-actions'
import { IVideo, SearchPlatformType } from '../../types'
import { IAsyncState } from '../moduleTypes'
import { searchResultActions } from './actions'

export type TSearchResult_Action = ActionType<typeof searchResultActions>

export type TSearchResultTypeByPlatform = IAsyncState & { items: IVideo[] }

export type TSearchResultType = {
  [key in SearchPlatformType]: TSearchResultTypeByPlatform
}
