import React from 'react'
import { IPlaylist } from '../../../types'
import { CustomClearButton } from '../../elements/CustomButton'
import PlaylistItem from '../../elements/PlaylistItem'
import * as Strings from '../../../lib/strings'
import AddPlaylistButton from '../../elements/AddPlaylistButton'
import clsx from 'clsx'

interface IProps {
  playlists: IPlaylist[]
  isSmScreen: boolean
  isFirstOnAdd: boolean
  onClickCancle: () => void
  onClickPlaylist: (item: IPlaylist) => void
}

function SelectPlaylistView({ playlists, isSmScreen, isFirstOnAdd, onClickCancle, onClickPlaylist }: IProps) {
  return (
    <div className="w-full h-full text-center flex flex-col">
      <div className="w-full flex-1 overflow-y-auto">
        {isFirstOnAdd && <div className="text-md mb-4">{Strings.SelectPlaylist}</div>}
        <div
          className={clsx(
            'w-full overflow-y-auto justify-center gap-4 px-2 pb-2',
            isSmScreen ? 'grid grid-cols-2' : 'flex flex-wrap ',
          )}
        >
          {playlists.map((playlist, index) => (
            <PlaylistItem key={index} item={playlist} index={index} onClick={onClickPlaylist} />
          ))}
        </div>
      </div>
      <div className="max-h-fit p-1 flex justify-center gap-x-4 w-full">
        <CustomClearButton text="취소" type="secondary" onClick={onClickCancle} />
        <AddPlaylistButton text="새 리스트" place="top" />
      </div>
    </div>
  )
}

export default SelectPlaylistView
