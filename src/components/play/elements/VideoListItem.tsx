import clsx from 'clsx'
import { MdDelete, MdEdit } from 'react-icons/md'
import { IVideoHasRange } from '../../../types'

interface IProps {
  video: IVideoHasRange
  itemIndex: number
  currentVideoIndex: number
  onClickItem: (itemIndex: number) => void
}

export default function VideoListItem({ video, itemIndex, currentVideoIndex, onClickItem }: IProps) {
  return (
    <div
      className={clsx(
        itemIndex === currentVideoIndex ? 'border-2 border-redrose' : 'opacity-50',
        'w-full h-20 flex gap-2 hover:bg-background-light-hover hover:shadow-outer rounded-2xl cursor-pointer overflow-hidden',
      )}
      onClick={() => onClickItem(itemIndex)}
    >
      <img src={video.thumbnail} alt="thumbnail" className="w-1/3 aspect-video" />
      <div className="flex flex-col justify-between py-1">
        <div className="twoLine">{video.title}</div>
        <div className="flex gap-x-4 text-lg">
          <MdEdit />
          <MdDelete className="text-redrose" />
        </div>
      </div>
    </div>
  )
}
