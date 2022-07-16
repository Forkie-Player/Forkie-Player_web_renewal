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
    <div className="flex h-full w-full flex-col overflow-y-auto overflow-x-hidden">
      <GobackLine className="mb-2 px-1" />
      <div className="px-1 lg:flex-1 lg:overflow-hidden lg:pr-0">
        <div
          ref={resizeDetectorRef}
          className={clsx(
            'grid h-full w-full grid-cols-[auto_20rem] gap-2 lg:grid-rows-[auto_10rem] 2xl:grid-cols-[auto_24rem]',
          )}
          style={{
            gridTemplateRows: containerGridRows,
          }}
        >
          <div className="sticky top-0 z-50 col-span-2 h-full w-full lg:z-0 lg:col-span-1">
            <VideoRender playerRef={playerRef} video={currentVideo} playerProps={{ onEnded: onVideoEnd }} />
          </div>
          <div className="col-span-2 row-start-2 h-fit pl-2 pb-4 lg:col-start-1 lg:row-start-2 2xl:pb-8">
            <VideoInfo data={currentVideo} />
          </div>
          <div className="col-span-2 row-start-3 mr-2 mb-1 overflow-y-auto lg:col-span-1 lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:mr-0">
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
