import clsx from 'clsx'
import React, { useCallback } from 'react'
import { MdMoreVert } from 'react-icons/md'
import { IPlaylist } from '../../types'
import { CustomButtonWrapper } from './CustomButton'

interface IProps {
  item: IPlaylist
  index: number
  showEditButton?: boolean
  onClick: (item: IPlaylist) => any
  onClickEdit?: (item: IPlaylist) => any
}

const PlaylistItem = React.forwardRef<HTMLDivElement, IProps>(
  ({ item, showEditButton = false, onClick, onClickEdit }: IProps, ref) => {
    const onClickListItem = useCallback(() => onClick(item), [item, onClick])

    const onClickEditButton = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        e.stopPropagation()
        if (onClickEdit !== undefined) {
          onClickEdit(item)
        }
      },
      [item, onClickEdit],
    )

    return (
      <div
        ref={ref}
        className="w-full h-full aspect-square flex flex-col bg-white rounded-3xl shadow-outer overflow-hidden hover:drop-shadow-md active:shadow-inner cursor-pointer"
        onClick={onClickListItem}
      >
        {item?.thumbnail ? (
          <img src={item?.thumbnail} alt="thumbnail" className="w-full flex-1 object-cover" />
        ) : (
          <div className="w-full flex-1 bg-blackberry-lightest" />
        )}
        <div className={clsx('relative w-full flex text-center h-12 leading-[3rem]', showEditButton ? 'px-8' : 'px-3')}>
          <div className="flex-auto line-clamp-1 m-auto">{item?.title}</div>
          {showEditButton && (
            <div className="absolute w-12 h-full -right-4 py-3 cursor-pointer" onClick={onClickEditButton}>
              <CustomButtonWrapper>
                <MdMoreVert className="text-xl" />
              </CustomButtonWrapper>
            </div>
          )}
        </div>
      </div>
    )
  },
)

export default PlaylistItem
