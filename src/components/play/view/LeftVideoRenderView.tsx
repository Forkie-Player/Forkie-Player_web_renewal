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
    <>
      {video !== undefined && (
        <>
          <VideoRender playerRef={playerRef} video={video} playerProps={{ onEnded: onVideoEnd }} />
          <VideoInfo data={video} />
        </>
      )}
    </>
  )
}

export default React.memo(LeftVideoRenderView)
