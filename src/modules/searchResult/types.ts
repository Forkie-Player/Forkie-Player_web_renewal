import { ActionType } from 'typesafe-actions'
import { IVideo, SearchPlatformType } from '../../types'
import { IAsyncState } from '../moduleTypes'
import { searchResultActions } from './actions'

export type TSearchResult_Action = ActionType<typeof searchResultActions>

export type TSearchResultTypeByPlatform = IAsyncState & { items: IVideo[] }

const ArraySearchPlatformType: Array<SearchPlatformType> = ['YOUTUBE', 'TWITCH', 'DAILYMOTION']
export type TSearchResultType = {
  [key in typeof ArraySearchPlatformType[number]]: TSearchResultTypeByPlatform
}
