import { IVideoInPlaylist } from '../../types'

export default function sortPlaylistBySequence(
  a: Pick<IVideoInPlaylist, 'sequence'>,
  b: Pick<IVideoInPlaylist, 'sequence'>,
) {
  return a.sequence - b.sequence
}
