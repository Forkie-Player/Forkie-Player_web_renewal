import clsx from 'clsx'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { IVideoInPlaylist } from '../../../types'
import { CustomIconButton } from '../../elements/CustomButton'
import { TimeLapse } from '../../elements/TimeLapse'
import { Draggable } from 'react-beautiful-dnd'
import { twMerge } from 'tailwind-merge'

interface IVideoListItemProps {
  video: IVideoInPlaylist
  index: number
  currentVideo: IVideoInPlaylist
  onClickItem: (item: IVideoInPlaylist) => void
  onClickEdit: (video: IVideoInPlaylist, reference: HTMLDivElement) => void | Promise<void>
  onClickDelete: (video: IVideoInPlaylist, reference: HTMLDivElement) => void | Promise<void>
}

const VideoListItem = forwardRef<HTMLDivElement | null, IVideoListItemProps>(
  ({ video, index, currentVideo, onClickItem, onClickEdit, onClickDelete }, ref) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => {
        return referenceElement
      },
      [referenceElement],
    )

    const onClickEditCallback = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (referenceElement !== null) {
          onClickEdit(video, referenceElement)
        }
        e.stopPropagation()
      },
      [video, referenceElement, onClickEdit],
    )
    const onClickDeleteCallback = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (referenceElement !== null) {
          onClickDelete(video, referenceElement)
        }
        e.stopPropagation()
      },
      [video, referenceElement, onClickDelete],
    )

    return (
      <Draggable key={video.id} draggableId={`${video.id}`} index={index}>
        {(provided, snapshot) => (
          <div
            ref={ref => {
              setReferenceElement(ref)
              provided.innerRef(ref)
            }}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            className={twMerge(
              clsx(
                video.id === currentVideo.id && 'border-2 border-redrose',
                video.id !== currentVideo.id && !snapshot.isDragging && 'opacity-50',
                'h-fit 2xl:h-28 cursor-pointer flex gap-2 rounded-2xl overflow-hidden ',
                'hover:bg-background-light-hover hover:shadow-outer',
                !snapshot.isDragging && 'w-full',
                snapshot.isDragging && 'drop-shadow-2xl bg-white',
              ),
            )}
            onClick={() => onClickItem(video)}
          >
            <img src={video.thumbnail} alt="thumbnail" className="max-w-[33%] min-w-[33%] aspect-video object-cover" />
            <div className="flex flex-col justify-between py-1">
              <div className="line-clamp-1 2xl:line-clamp-2">{video.title}</div>
              <div className="text-blackberry-light">
                <TimeLapse range={[video.start, video.end]} gap={2} />
              </div>
              <div className="flex gap-x-2 text-lg">
                <CustomIconButton icon={<MdEdit />} onClick={onClickEditCallback} type="secondary" />
                <CustomIconButton icon={<MdDelete />} onClick={onClickDeleteCallback} />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    )
  },
)

export default VideoListItem
