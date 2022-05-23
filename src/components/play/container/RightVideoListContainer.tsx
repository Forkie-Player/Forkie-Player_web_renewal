import React, { useCallback, useState } from 'react'
import { IVideoInPlaylist } from '../../../types'
import RightVideoListView from '../view/RightVideoListView'
import { DropResult } from 'react-beautiful-dnd'
import VideoListPopper from '../elements/VideoListPopper'

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

  // 비디오 수정 버튼 눌렀을때, 설정하고 팝업 띄우기
  const onClickEditButtonCheck = useCallback((video: IVideoInPlaylist, reference: HTMLDivElement) => {
    setPopperMode('edit')
    setSelectedVideo(video)
    setReferenceElement(reference)
    setShowPopper(true)
  }, [])

  // 비디오 삭제 버튼 눌렀을때, 설정하고 팝업 띄우기
  const onClickDeleteButtonCheck = useCallback((video: IVideoInPlaylist, reference: HTMLDivElement) => {
    setPopperMode('delete')
    setSelectedVideo(video)
    setReferenceElement(reference)
    setShowPopper(true)
  }, [])

  // 비디오 수정 팝업에서 '예' 눌렀을때
  const onClickEditComplete = useCallback(() => {
    if (selectedVideo !== null) {
      onClickEdit(selectedVideo)
    }
  }, [onClickEdit, selectedVideo])

  // 비디오 삭제 팝업에서 '예' 눌렀을때
  const onClickDeleteComplete = useCallback(() => {
    if (selectedVideo !== null) {
      onClickDelete(selectedVideo)
    }
    setShowPopper(false)
  }, [onClickDelete, selectedVideo])

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
        <VideoListPopper
          referenceElement={referenceElement}
          popperMode={popperMode}
          onToggleShowPopper={onToggleShowPopper}
          onClickEditComplete={onClickEditComplete}
          onClickDeleteComplete={onClickDeleteComplete}
        />
      )}
    </>
  )
}

export default React.memo(RightVideoListContainer)
