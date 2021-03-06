import { videoActions } from './actions'
import { ActionType } from 'typesafe-actions'
import { IAsyncState } from '../moduleTypes'
import { IVideoInPlaylist } from '../../types'

export type TVideo_Action = ActionType<typeof videoActions>

export type TVideoStoreType = IAsyncState & {
  playlistId: number | null
  items: IVideoInPlaylist[]
  currentVideo: IVideoInPlaylist
}
export interface IDeleteVideoSuccess {
  id: number
  currentVideo: IVideoInPlaylist
}

export interface IChangeVideoOrderAsyncRequest {
  from: number
  to: number
}
