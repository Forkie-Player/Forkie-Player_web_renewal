import React from 'react'
import ReactPlayer from 'react-player'
import { IVideoHasRange } from '../../../types'
import VideoInfo from '../../elements/videoInfo'
import VideoRender from '../../video'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  video: IVideoHasRange | undefined
  onVideoEnd?: () => void
}

const LeftVideoRenderView = ({ playerRef, video, onVideoEnd }: IProps) => {
  return (
    <div className="h-full pt-4">
      {video !== undefined && (
        <div className="h-full flex flex-col">
          <div className="w-full flex-1">
            <VideoRender playerRef={playerRef} video={video} playerProps={{ onEnded: onVideoEnd }} />
          </div>
          <div className="h-40 pt-4 pb-8">
            <VideoInfo data={video} />
          </div>
        </div>
      )}
    </div>
  )
}

export default React.memo(LeftVideoRenderView)
