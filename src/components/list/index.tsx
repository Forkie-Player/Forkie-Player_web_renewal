import { useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootModuleType } from '../../modules/moduleTypes'
import AddPlaylistButton from '../elements/AddPlaylistButton'
import ListContainer from './container/ListContainer'

import * as Strings from '../../lib/strings'
import { getVideoAsync } from '../../modules/video/actions'
import { deletePlaylistAsync, editPlaylistTitleAsync } from '../../modules/playlist/actions'

function ListComponent() {
  const { playlist: playlistStore, video: videoStore } = useSelector(({ playlist, video }: RootModuleType) => ({
    playlist,
    video,
  }))

  const dispatch = useDispatch()

  const onClickPlaylistItem = useCallback(
    ({ id }: { id: number }) => {
      dispatch(getVideoAsync.request(id))
    },
    [dispatch],
  )
  const onClickTitleEdit = useCallback(
    (id: number, newTitle: string) => {
      if (playlistStore.items.some(item => item.title === newTitle)) {
        return Strings.SameTitleInPlaylist
      }
      dispatch(editPlaylistTitleAsync.request({ id: id, title: newTitle }))
    },
    [playlistStore, dispatch],
  )

  const onClickDeleteListItem = useCallback(
    (id: number) => {
      dispatch(deletePlaylistAsync.request(id))
    },
    [dispatch],
  )

  return (
    <div className="w-full h-full px-[5%] space-y-4">
      <div className="flex justify-between">
        <div className="select-none text-xl font-bold">{Strings.Playlists}</div>
        <AddPlaylistButton />
      </div>
      <ListContainer
        playlistStore={playlistStore}
        videoStore={videoStore}
        onClickPlaylistItem={onClickPlaylistItem}
        onClickTitleEdit={onClickTitleEdit}
        onClickDeleteListItem={onClickDeleteListItem}
      />
    </div>
  )
}
export default ListComponent
