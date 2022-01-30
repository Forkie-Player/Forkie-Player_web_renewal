import React from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { youtubeVideoPrefixURL } from '../../../lib/constants'
import { IVideoHasRange } from '../../../types'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
}

function VideoView({ playerRef, playerProps, video }: IProps) {
  return (
    <div id="player_wrapper" className={`max-w-full w-full h-full max-h-full`}>
      <ReactPlayer
        {...playerProps}
        ref={playerRef}
        playing
        controls
        url={`${youtubeVideoPrefixURL}${video.videoId}`}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default VideoView
