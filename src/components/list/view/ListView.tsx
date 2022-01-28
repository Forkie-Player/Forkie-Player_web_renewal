import { IPlaylist } from '../../../types'
import PlaylistItem from '../../elements/PlaylistItem'
import PlaylistPopper from '../elements/PlaylistPopper'

interface IProps {
  items: IPlaylist[]
  showModal: boolean
  onClickPlaylistItem: ({ id }: { id: number }) => void
  onClickEditButton: (item: IPlaylist) => void | Promise<void>
  onToggleShowPopper: () => void
  onClickDeleteListItem: () => void
  onClickTitleEdit: (titleInput: string) => string
}

function ListView({
  items,
  showModal,
  onClickPlaylistItem,
  onClickEditButton,
  onToggleShowPopper,
  onClickDeleteListItem,
  onClickTitleEdit,
}: IProps) {
  return (
    <div className="w-full pb-4 overflow-y-auto grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-4 2xl:gap-8">
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
      <PlaylistPopper
        showModal={showModal}
        onToggleShowPopper={onToggleShowPopper}
        onClickDelete={onClickDeleteListItem}
        onClickTitleEdit={onClickTitleEdit}
      />
    </div>
  )
}

export default ListView
//flex flex-wrap gap-4 lg:gap-6 2xl:gap-8 py-4
