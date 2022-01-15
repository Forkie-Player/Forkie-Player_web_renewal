import clsx from 'clsx'
import { forwardRef, useCallback, useImperativeHandle, useState } from 'react'
import { MdDelete, MdEdit } from 'react-icons/md'
import { usePopper } from 'react-popper'
import palette from '../../../lib/style/palette'
import { IVideoInPlaylist } from '../../../types'
import { CustomClearButton, CustomIcomButton } from '../../elements/CustomButton'
import { TimeLapse } from '../../elements/TimeLapse'

import * as Strings from '../../../lib/strings'

interface IProps {
  video: IVideoInPlaylist
  currentVideo: IVideoInPlaylist
  onClickItem: (itemIndex: IVideoInPlaylist) => void
  onClickEdit: (video: IVideoInPlaylist) => void | Promise<void>
  onClickDelete: (video: IVideoInPlaylist) => void | Promise<void>
}

const VideoListItem = forwardRef<HTMLDivElement | null, IProps>(
  ({ video, currentVideo, onClickItem, onClickEdit, onClickDelete }, ref) => {
    const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
    const [popperElement, setPopperElement] = useState<HTMLDivElement | null>(null)
    const [showPopper, setShowPopper] = useState(false)
    const [popperMode, setPopperMode] = useState<'edit' | 'delete' | null>(null)

    const { styles, attributes } = usePopper(referenceElement, popperElement)

    useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(
      ref,
      () => {
        return referenceElement
      },
      [referenceElement],
    )

    const onToggleShowPopper = useCallback(() => {
      setShowPopper(prev => !prev)
    }, [])

    const onClickEditButtonCheck = useCallback(
      e => {
        setPopperMode('edit')
        onToggleShowPopper()
        e.stopPropagation()
      },
      [onToggleShowPopper],
    )

    const onClickDeleteButtonCheck = useCallback(
      e => {
        setPopperMode('delete')
        onToggleShowPopper()
        e.stopPropagation()
      },
      [onToggleShowPopper],
    )

    const onClickEditButton = useCallback(() => {
      onClickEdit(video)
    }, [onClickEdit, video])

    const onClickDeleteButton = useCallback(() => {
      onClickDelete(video)
      onToggleShowPopper()
    }, [onClickDelete, onToggleShowPopper, video])

    return (
      <div ref={setReferenceElement} className={clsx('w-full h-28  cursor-pointer')}>
        <div
          className={clsx(
            video.id === currentVideo.id ? 'border-2 border-redrose' : 'opacity-50',
            'w-full h-full flex gap-2 rounded-2xl overflow-hidden hover:bg-background-light-hover hover:shadow-outer',
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
              <CustomIcomButton icon={<MdEdit />} onClick={onClickEditButtonCheck} />
              <CustomIcomButton icon={<MdDelete />} onClick={onClickDeleteButtonCheck} textColor={palette.redrose} />
            </div>
          </div>
        </div>
        {showPopper && (
          <div ref={setPopperElement} style={styles.popper} {...attributes.popper} className="z-50">
            <div className={'border-2 relative p-4 bg-background-light rounded-2xl space-y-4 shadow-outer'}>
              <div className="text-blackberry">
                {popperMode === 'edit' ? Strings.CheckVideoEdit : Strings.CheckVideoDelete}
              </div>
              <div className="flex gap-x-4 justify-center">
                <CustomClearButton text="아니요" textColor={palette.blackberry} onClick={onToggleShowPopper} />
                <CustomClearButton
                  text="네"
                  textColor={palette.redrose}
                  onClick={popperMode === 'edit' ? onClickEditButton : onClickDeleteButton}
                />
              </div>
            </div>
          </div>
        )}
      </div>
    )
  },
)

export default VideoListItem
