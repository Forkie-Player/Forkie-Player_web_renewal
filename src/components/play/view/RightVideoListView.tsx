import React from 'react'
import { IVideoInPlaylist } from '../../../types'
import VideoListItem from '../elements/VideoListItem'

interface IProps {
  itemRef: React.RefObject<HTMLDivElement>
  videoList: IVideoInPlaylist[]
  currentVideoIndex: number
  onClickVideoListItem: (itemIndex: number) => void
  onClickEdit: (video: number) => void | Promise<void>
  onClickDelete: (video: number) => void | Promise<void>
}
function RightVideoListView({
  itemRef,
  videoList,
  currentVideoIndex,
  onClickVideoListItem,
  onClickEdit,
  onClickDelete,
}: IProps) {
  return (
    <div className="w-full h-full space-y-2 overflow-y-auto pb-4">
      {videoList.map((video, index) => (
        <VideoListItem
          ref={index === currentVideoIndex ? itemRef : undefined}
          video={video}
          itemIndex={index}
          currentVideoIndex={currentVideoIndex}
          onClickItem={onClickVideoListItem}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      ))}
    </div>
  )
}

export default RightVideoListView
