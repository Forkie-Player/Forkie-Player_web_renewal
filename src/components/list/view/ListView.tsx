import React from 'react'
import { IPlaylist } from '../../../types'
import PlaylistItem from '../../elements/PlaylistItem'

interface IProps {
  items: IPlaylist[]
  onClickPlaylistItem: ({ id }: { id: number }) => void
}

function ListView({ items, onClickPlaylistItem }: IProps) {
  return (
    <div className="w-full overflow-y-auto flex gap-8 flex-wrap pr-[10%] py-4 px-2">
      {items.map((item, index) => (
        <PlaylistItem item={item} index={index} key={`listitem_${index}`} onClick={onClickPlaylistItem} />
      ))}
    </div>
  )
}

export default ListView
