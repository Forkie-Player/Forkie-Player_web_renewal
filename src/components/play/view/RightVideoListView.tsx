import React, { useEffect } from 'react'
import { IVideoInPlaylist } from '../../../types'
import VideoListItem from '../elements/VideoListItem'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

interface IProps {
  videoList: IVideoInPlaylist[]
  currentVideo: IVideoInPlaylist
  onClickVideoListItem: (item: IVideoInPlaylist) => void
  onClickEdit: (video: IVideoInPlaylist, reference: HTMLDivElement) => void | Promise<void>
  onClickDelete: (video: IVideoInPlaylist, reference: HTMLDivElement) => void | Promise<void>
  onVideoListDragEnd: (result: DropResult) => void
}
function RightVideoListView({
  videoList,
  currentVideo,
  onClickVideoListItem,
  onClickEdit,
  onClickDelete,
  onVideoListDragEnd,
}: IProps) {
  const itemRef = React.useRef<HTMLDivElement | null>(null)
  const containerRef = React.useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (itemRef.current !== null) {
      itemRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' })
    }
  }, [itemRef, currentVideo])

  return (
    <div ref={containerRef} className="w-full h-full ">
      <DragDropContext onDragEnd={onVideoListDragEnd}>
        <Droppable droppableId="droppable">
          {provided => (
            <div {...provided.droppableProps} ref={provided.innerRef} className="w-full h-full space-y-2 pr-2 ">
              {videoList.map((video, index) => (
                <VideoListItem
                  ref={video.id === currentVideo.id ? itemRef : undefined}
                  key={`videolist_${index}`}
                  video={video}
                  currentVideo={currentVideo}
                  index={index}
                  onClickItem={onClickVideoListItem}
                  onClickDelete={onClickDelete}
                  onClickEdit={onClickEdit}
                />
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  )
}

export default RightVideoListView
