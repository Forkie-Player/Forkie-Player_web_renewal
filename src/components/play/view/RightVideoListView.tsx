import React, { useEffect } from 'react'
import { IVideoInPlaylist } from '../../../types'
import VideoListItem from '../elements/VideoListItem'

interface IProps {
  videoList: IVideoInPlaylist[]
  currentVideo: IVideoInPlaylist
  onClickVideoListItem: (item: IVideoInPlaylist) => void
  onClickEdit: (video: IVideoInPlaylist, reference: HTMLDivElement) => void | Promise<void>
  onClickDelete: (video: IVideoInPlaylist, reference: HTMLDivElement) => void | Promise<void>
}
function RightVideoListView({ videoList, currentVideo, onClickVideoListItem, onClickEdit, onClickDelete }: IProps) {
  const itemRef = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (itemRef.current !== null) {
      itemRef.current.scrollIntoView()
    }
  }, [itemRef, currentVideo])

  return (
    <div className="w-full h-full space-y-2 overflow-y-auto pb-4">
      {videoList.map((video, index) => (
        <VideoListItem
          ref={video.id === currentVideo.id ? itemRef : undefined}
          key={`videolist_${index}`}
          video={video}
          currentVideo={currentVideo}
          onClickItem={onClickVideoListItem}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      ))}
    </div>
  )
}

export default RightVideoListView
