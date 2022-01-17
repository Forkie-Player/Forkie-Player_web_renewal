import React, { useCallback } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { IPlaylist } from '../../types'
import { CustomButtonWrapper } from './CustomButton'

interface IProps {
  item: IPlaylist
  index: number
  showEditButton?: boolean
  onClick: (item: IPlaylist) => any
  onClickEdit?: (item: IPlaylist, ref: HTMLDivElement | null) => any
}

const PlaylistItem = React.forwardRef<HTMLDivElement, IProps>(
  ({ item, showEditButton = false, onClick, onClickEdit }: IProps, ref) => {
    const [referenceElement, setReferenceElement] = React.useState<HTMLDivElement | null>(null)
    const onClickListItem = useCallback(() => onClick(item), [item, onClick])

    const onClickEditButton = useCallback(
      (e: React.MouseEvent<SVGElement>) => {
        e.stopPropagation()
        if (onClickEdit !== undefined) {
          onClickEdit(item, referenceElement)
        }
      },
      [item, referenceElement, onClickEdit],
    )

    return (
      <div
        ref={ref}
        className="w-60 h-60 bg-white rounded-3xl shadow-outer overflow-hidden hover:drop-shadow-md active:shadow-inner cursor-pointer"
        onClick={onClickListItem}
      >
        {item?.thumbnail ? (
          <img src={item?.thumbnail} alt="thumbnail" className="w-full min-h-[80%] max-h-[80%] object-cover" />
        ) : (
          <div className="w-full min-h-[80%] max-h-[80%] bg-blackberry-lightest" />
        )}
        <div className="relative w-full flex text-center leading-10">
          <div className="flex-auto">{item?.title}</div>
          {showEditButton && (
            <div ref={setReferenceElement} className="absolute h-full right-2 py-2 cursor-pointer">
              <CustomButtonWrapper>
                <MdMoreVert className="text-xl" onClick={onClickEditButton} />
              </CustomButtonWrapper>
            </div>
          )}
        </div>
      </div>
    )
  },
)

export default PlaylistItem
