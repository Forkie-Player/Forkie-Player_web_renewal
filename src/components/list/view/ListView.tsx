import { IPlaylist } from '../../../types'
import PlaylistItem from '../../elements/PlaylistItem'
import PlaylistPopper from '../elements/PlaylistPopper'

interface IProps {
  items: IPlaylist[]
  showPopper: boolean
  referenceElement: HTMLDivElement | null
  onClickPlaylistItem: ({ id }: { id: number }) => void
  onClickEditButton: (item: IPlaylist, reference: HTMLDivElement | null) => void | Promise<void>
  onToggleShowPopper: () => void
  onClickDeleteListItem: () => void
  onClickTitleEdit: (titleInput: string) => string
}

function ListView({
  items,
  showPopper,
  referenceElement,
  onClickPlaylistItem,
  onClickEditButton,
  onToggleShowPopper,
  onClickDeleteListItem,
  onClickTitleEdit,
}: IProps) {
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
      {showPopper && (
        <PlaylistPopper
          referenceElement={referenceElement}
          onToggleShowPopper={onToggleShowPopper}
          onClickDelete={onClickDeleteListItem}
          onClickTitleEdit={onClickTitleEdit}
        />
      )}
    </div>
  )
}

export default ListView
