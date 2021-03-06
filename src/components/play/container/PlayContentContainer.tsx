import React from 'react'
import { DropResult } from 'react-beautiful-dnd'
import ReactPlayer from 'react-player'
import { useResizeDetector } from 'react-resize-detector'
import { screenSizeString, videoAspectRatio } from '../../../lib/constants'
import { IVideoInPlaylist } from '../../../types'
import PlayContentView from '../view/PlayContentView'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  currentVideo: IVideoInPlaylist
  videoList: IVideoInPlaylist[]
  screenSize: string
  isPendingChangeVideoOrder: boolean
  onClickVideoListItem: (item: IVideoInPlaylist) => void
  onClickEdit: (video: IVideoInPlaylist) => void | Promise<void>
  onClickDelete: (video: IVideoInPlaylist) => void | Promise<void>
  onVideoListDragEnd: (result: DropResult) => void
  onVideoEnd?: () => void
}

function PlayContentContainer({
  playerRef,
  currentVideo,
  videoList,
  screenSize,
  isPendingChangeVideoOrder,
  onVideoEnd,
  onClickVideoListItem,
  onVideoListDragEnd,
  onClickDelete,
  onClickEdit,
}: IProps) {
  const resizeDetector = useResizeDetector<HTMLDivElement>()

  const containerGridRows = React.useMemo(() => {
    if (resizeDetector.width !== undefined) {
      switch (screenSize) {
        case screenSizeString.MD:
        case screenSizeString.SM:
        case screenSizeString.XSM:
          return `minmax(${resizeDetector?.width / videoAspectRatio}px, auto) min-content min-content`
      }
    }
    return ''
  }, [resizeDetector.width, screenSize])

  return (
    <PlayContentView
      resizeDetectorRef={resizeDetector.ref}
      containerGridRows={containerGridRows}
      playerRef={playerRef}
      currentVideo={currentVideo}
      videoList={videoList}
      isPendingChangeVideoOrder={isPendingChangeVideoOrder}
      onClickVideoListItem={onClickVideoListItem}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      onVideoListDragEnd={onVideoListDragEnd}
      onVideoEnd={onVideoEnd}
    />
  )
}

export default React.memo(PlayContentContainer)
