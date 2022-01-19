import React from 'react'
import { IPlaylist } from '../../../types'
import { CustomClearButton } from '../../elements/CustomButton'
import PlaylistItem from '../../elements/PlaylistItem'
import * as Strings from '../../../lib/strings'
import AddPlaylistButton from '../../elements/AddPlaylistButton'

interface IProps {
  playlists: IPlaylist[]
  onClickCancle: () => void
  onClickPlaylist: (item: IPlaylist) => void
}

function SelectPlaylistView({ playlists, onClickCancle, onClickPlaylist }: IProps) {
  return (
    <div className="w-full h-full text-center flex flex-col">
      <div className="w-full basis-11/12 overflow-y-auto ">
        <div className="text-md">{Strings.SelectPlaylist}</div>
        <div className="w-full basis-10/12 flex  overflow-y-auto justify-center flex-wrap gap-y-4 py-4">
          {playlists.map((playlist, index) => (
            <PlaylistItem item={playlist} index={index} onClick={onClickPlaylist} />
          ))}
        </div>
      </div>
      <div className="basis-1/12 p-2 flex justify-center gap-x-4 w-full">
        <CustomClearButton text="취소" type="secondary" onClick={onClickCancle} />
        <AddPlaylistButton text="새 플레이리스트" place="top" />
      </div>
    </div>
  )
}

export default SelectPlaylistView
