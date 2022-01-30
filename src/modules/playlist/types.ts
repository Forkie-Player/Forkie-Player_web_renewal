import { ActionType } from 'typesafe-actions'
import { IPlaylist } from '../../types'
import { IAsyncState } from '../moduleTypes'
import { playlistActions } from './actions'

export type TPlaylist_Action = ActionType<typeof playlistActions>
export type TPlaylistType = IAsyncState & { items: IPlaylist[] }

export interface IAddVideoReturn {
  id: number
  thumbnail: string
}
