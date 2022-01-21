import React, { useCallback, useState } from 'react'
import { IVideoInPlaylist } from '../../../types'
import { CustomClearButton } from '../../elements/CustomButton'
import RightVideoListView from '../view/RightVideoListView'
import { DropResult } from 'react-beautiful-dnd'
import * as Strings from '../../../lib/strings'
import PopperWrapper from '../../elements/PopperWrapper'

interface IProps {
  videoList: IVideoInPlaylist[]
  currentVideo: IVideoInPlaylist
  onClickVideoListItem: (item: IVideoInPlaylist) => void
  onClickEdit: (video: IVideoInPlaylist) => void | Promise<void>
  onClickDelete: (video: IVideoInPlaylist) => void | Promise<void>
  onVideoListDragEnd: (result: DropResult) => void
}

function RightVideoListContainer({
  videoList,
  currentVideo,
  onClickVideoListItem,
  onClickEdit,
  onClickDelete,
  onVideoListDragEnd,
}: IProps) {
  const [showPopper, setShowPopper] = useState(false)

  const [referenceElement, setReferenceElement] = useState<HTMLDivElement | null>(null)
  const [popperMode, setPopperMode] = useState<'edit' | 'delete'>('edit')
  const [selectedVideo, setSelectedVideo] = useState<IVideoInPlaylist | null>(null)

  const onClickEditButton = useCallback(() => {
    if (selectedVideo !== null) {
      onClickEdit(selectedVideo)
    }
  }, [onClickEdit, selectedVideo])

  const onClickDeleteButton = useCallback(() => {
    if (selectedVideo !== null) {
      onClickDelete(selectedVideo)
    }
    setShowPopper(false)
  }, [onClickDelete, selectedVideo])

  const onClickEditButtonCheck = useCallback((video: IVideoInPlaylist, reference: HTMLDivElement) => {
    setPopperMode('edit')
    setSelectedVideo(video)
    setReferenceElement(reference)
    console.log('asdasd')
    setShowPopper(true)
  }, [])

  const onClickDeleteButtonCheck = useCallback((video: IVideoInPlaylist, reference: HTMLDivElement) => {
    setPopperMode('delete')
    setSelectedVideo(video)
    setReferenceElement(reference)
    setShowPopper(true)
  }, [])

  const onToggleShowPopper = useCallback(() => {
    setShowPopper(prev => !prev)
  }, [])

  return (
    <>
      <RightVideoListView
        videoList={videoList}
        currentVideo={currentVideo}
        onClickVideoListItem={onClickVideoListItem}
        onClickEdit={onClickEditButtonCheck}
        onClickDelete={onClickDeleteButtonCheck}
        onVideoListDragEnd={onVideoListDragEnd}
      />
      {showPopper && (
        <PopperWrapper referenceElement={referenceElement} onToggleShowPopper={onToggleShowPopper}>
          <div className={'border-2 relative p-4 bg-white rounded-2xl space-y-4 shadow-outer'}>
            <div className="text-blackberry">
              {popperMode === 'edit' ? Strings.CheckVideoEdit : Strings.CheckVideoDelete}
            </div>
            <div className="flex gap-x-4 justify-center">
              <CustomClearButton text="아니요" type="secondary" onClick={() => setShowPopper(false)} />
              <CustomClearButton text="네" onClick={popperMode === 'edit' ? onClickEditButton : onClickDeleteButton} />
            </div>
          </div>
        </PopperWrapper>
      )}
    </>
  )
}

export default React.memo(RightVideoListContainer)
