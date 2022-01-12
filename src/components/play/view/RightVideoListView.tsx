import React from 'react'
import { IVideoHasRange } from '../../../types'
import VideoListItem from '../elements/VideoListItem'

interface IProps {
  videoList: IVideoHasRange[]
  currentVideoIndex: number
  onClickVideoListItem: (itemIndex: number) => void
}
function RightVideoListView({ videoList, currentVideoIndex, onClickVideoListItem }: IProps) {
  return (
    <div className="w-full h-full space-y-2 overflow-y-auto pb-4">
      {videoList.map((video, index) => (
        <VideoListItem
          video={video}
          itemIndex={index}
          currentVideoIndex={currentVideoIndex}
          onClickItem={onClickVideoListItem}
        />
      ))}
    </div>
  )
}

export default RightVideoListView
