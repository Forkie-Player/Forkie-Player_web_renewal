import clsx from 'clsx'
import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import ReactPlayer from 'react-player'
import { IVideoInPlaylist } from '../../../types'
import GobackLine from '../../elements/GobackLine'
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
    <div className="w-full h-full flex flex-col overflow-x-hidden overflow-y-auto">
      <GobackLine className="px-1 mb-2" />
      <div className="lg:flex-1 lg:overflow-hidden px-1 lg:pr-0">
        <div
          ref={resizeDetectorRef}
          className={clsx(
            'w-full h-full grid lg:grid-rows-[auto_10rem] grid-cols-[auto_20rem] 2xl:grid-cols-[auto_24rem] gap-2',
          )}
          style={{
            gridTemplateRows: containerGridRows,
          }}
        >
          <div className="z-50 lg:z-0 sticky top-0 w-full h-full col-span-2 lg:col-span-1">
            <VideoRender playerRef={playerRef} video={currentVideo} playerProps={{ onEnded: onVideoEnd }} />
          </div>
          <div className="h-fit row-start-2 col-span-2 pl-2 lg:col-start-1 lg:row-start-2 pb-4 2xl:pb-8">
            <VideoInfo data={currentVideo} />
          </div>
          <div className="mr-2 lg:mr-0 row-start-3 col-span-2 lg:col-span-1 lg:row-start-1 lg:col-start-2 lg:row-span-2 overflow-y-auto mb-1">
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
        </div>
      </div>
    </div>
  )
}

export default PlayContentView
