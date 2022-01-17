import React from 'react'
import { IPlaylist } from '../../../types'
import PlaylistItem from '../../elements/PlaylistItem'

interface IProps {
  items: IPlaylist[]
  onClickPlaylistItem: ({ id }: { id: number }) => void
  onClickEditButton: (item: IPlaylist, reference: HTMLDivElement | null) => void | Promise<void>
}

function ListView({ items, onClickPlaylistItem, onClickEditButton }: IProps) {
  return (
    <div className="w-full overflow-y-auto flex gap-8 flex-wrap pr-[10%] py-4 px-2">
      {items.map((item, index) => (
        <PlaylistItem
          key={`playlistItem_${index}`}
          item={item}
          index={index}
          showEditButton={true}
          onClick={onClickPlaylistItem}
          onClickEdit={onClickEditButton}
        />
      ))}
    </div>
  )
}

export default ListView
