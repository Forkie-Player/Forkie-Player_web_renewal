import { IVideoInPlaylist } from '../../types'

export default function sortPlaylistBySequence(a: IVideoInPlaylist, b: IVideoInPlaylist) {
  return a.sequence - b.sequence
}
