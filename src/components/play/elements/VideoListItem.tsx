import clsx from 'clsx'
import { useCallback } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import palette from '../../../lib/style/palette'
import { IVideoInPlaylist } from '../../../types'
import { CustomIcomButton } from '../../elements/CustomButton'
import { TimeLapse } from '../../elements/TimeLapse'

interface IProps {
  itemRef?: React.RefObject<HTMLDivElement>
  video: IVideoInPlaylist
  itemIndex: number
  currentVideoIndex: number
  onClickItem: (itemIndex: number) => void
  onClickEdit: (video: number) => void | Promise<void>
  onClickDelete: (video: number) => void | Promise<void>
}

export default function VideoListItem({
  itemRef,
  video,
  itemIndex,
  currentVideoIndex,
  onClickItem,
  onClickEdit,
  onClickDelete,
}: IProps) {
  const onClickEditCallback = useCallback(() => onClickEdit(itemIndex), [onClickEdit, itemIndex])

  const onClickDeleteCallback = useCallback(() => onClickDelete(itemIndex), [onClickDelete, itemIndex])

  return (
    <div
      ref={itemRef}
      className={clsx(
        itemIndex === currentVideoIndex ? 'border-2 border-redrose' : 'opacity-50',
        'w-full h-28 flex gap-2 hover:bg-background-light-hover hover:shadow-outer rounded-2xl cursor-pointer overflow-hidden',
      )}
      onClick={() => onClickItem(itemIndex)}
    >
      <img src={video.thumbnail} alt="thumbnail" className="w-1/3 aspect-video" />
      <div className="flex flex-col justify-between py-1">
        <div className="twoLine">{video.title}</div>
        <div className="text-blackberry-light">
          <TimeLapse range={[video.start, video.end]} gap={2} />
        </div>
        <div className="flex gap-x-2 text-lg">
          <CustomIcomButton icon={<MdEdit />} onClick={onClickEditCallback} />
          <CustomIcomButton icon={<MdDelete />} onClick={onClickDeleteCallback} textColor={palette.redrose} />
        </div>
      </div>
    </div>
  )
}
