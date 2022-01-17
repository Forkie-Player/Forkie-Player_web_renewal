import clsx from 'clsx'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import palette from '../../../lib/style/palette'
import { IVideoInPlaylist } from '../../../types'
import { CustomIconButton } from '../../elements/CustomButton'
import { TimeLapse } from '../../elements/TimeLapse'
import { Draggable } from 'react-beautiful-dnd'

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
      (e: MouseEvent) => {
        if (referenceElement !== null) {
          onClickEdit(video, referenceElement)
        }
        e.stopPropagation()
      },
      [video, referenceElement, onClickEdit],
    )
    const onClickDeleteCallback = useCallback(
      (e: MouseEvent) => {
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
            className={clsx(
              snapshot.isDragging && 'drop-shadow-2xl bg-white',
              video.id === currentVideo.id && 'border-2 border-redrose',
              video.id !== currentVideo.id && !snapshot.isDragging && 'opacity-50',
              'w-full h-28 cursor-pointer flex gap-2 rounded-2xl overflow-hidden ',
              'hover:bg-background-light-hover hover:shadow-outer',
            )}
            onClick={() => onClickItem(video)}
          >
            <img src={video.thumbnail} alt="thumbnail" className="w-1/3 aspect-video" />
            <div className="flex flex-col justify-between py-1">
              <div className="twoLine">{video.title}</div>
              <div className="text-blackberry-light">
                <TimeLapse range={[video.start, video.end]} gap={2} />
              </div>
              <div className="flex gap-x-2 text-lg">
                <CustomIconButton icon={<MdEdit />} onClick={onClickEditCallback} />
                <CustomIconButton icon={<MdDelete />} onClick={onClickDeleteCallback} textColor={palette.redrose} />
              </div>
            </div>
          </div>
        )}
      </Draggable>
    )
  },
)

export default VideoListItem
