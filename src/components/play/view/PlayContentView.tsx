import clsx from 'clsx'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import ReactPlayer from 'react-player'
import { IVideoInPlaylist } from '../../../types'
import LoadingElement from '../../elements/loading'
import VideoInfo from '../../elements/videoInfo'
import VideoRender from '../../video'
import RightVideoListContainer from '../container/RightVideoListContainer'

interface IProps {
  resizeDetectorRef: React.RefObject<HTMLDivElement>
  containerGridRows: string
  playerRef: React.RefObject<ReactPlayer>
  currentVideo: IVideoInPlaylist
  videoList: IVideoInPlaylist[]
  isPendingChangeVideoOrder: boolean
  onClickVideoListItem: (item: IVideoInPlaylist) => void
  onClickEdit: (video: IVideoInPlaylist) => void | Promise<void>
  onClickDelete: (video: IVideoInPlaylist) => void | Promise<void>
  onVideoListDragEnd: (result: DropResult) => void
  onVideoEnd?: () => void
}

function PlayContentView({
  resizeDetectorRef,
  containerGridRows,
  playerRef,
  currentVideo,
  videoList,
  isPendingChangeVideoOrder,
  onVideoEnd,
  onClickVideoListItem,
  onVideoListDragEnd,
  onClickDelete,
  onClickEdit,
}: IProps) {
  return (
    <div
      ref={resizeDetectorRef}
      className={clsx(
        'transition-all w-full h-full grid lg:grid-rows-[auto_10rem] grid-cols-[auto_20rem] 2xl:grid-cols-[auto_24rem] gap-2',
      )}
      style={{
        gridTemplateRows: containerGridRows,
      }}
    >
      <div className="w-full h-full col-span-2 lg:col-span-1">
        <VideoRender playerRef={playerRef} video={currentVideo} playerProps={{ onEnded: onVideoEnd }} />
      </div>
      <div className="mr-2 lg:mr-0 row-start-2 col-start-2 lg:row-start-1 lg:col-start-2 lg:row-span-2 overflow-y-auto mb-1">
        {isPendingChangeVideoOrder ? (
          <LoadingElement />
        ) : (
          <RightVideoListContainer
            videoList={videoList}
            currentVideo={currentVideo}
            onVideoListDragEnd={onVideoListDragEnd}
            onClickVideoListItem={onClickVideoListItem}
            onClickDelete={onClickDelete}
            onClickEdit={onClickEdit}
          />
        )}
      </div>
      <div className="row-start-2 col-start-1 pl-2 lg:col-start-1 lg:row-start-2 pb-4 2xl:pb-8">
        <VideoInfo data={currentVideo} />
      </div>
    </div>
  )
}

export default React.memo(PlayContentView)
