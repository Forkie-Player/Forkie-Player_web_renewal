import React from 'react'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../../modules/moduleTypes'
import { IPlaylist } from '../../../types'
import SelectPlaylistView from '../view/SelectPlaylistView'

interface IProps {
  onClickCancle: () => void
  onClickPlaylist: (item: IPlaylist) => void
}

function SelectPlaylistContainer({ onClickCancle, onClickPlaylist }: IProps) {
  const playlists = useSelector(({ playlist }: RootModuleType) => playlist)
  return (
    <SelectPlaylistView playlists={playlists.items} onClickCancle={onClickCancle} onClickPlaylist={onClickPlaylist} />
  )
}

export default SelectPlaylistContainer
