import React from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { youtubeVideoPrefixURL } from '../../../lib/constants'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  videoId: string
  playerProps?: ReactPlayerProps
}

function VideoView({ playerRef, playerProps, videoId }: IProps) {
  return (
    <div id="player_wrapper" className={`max-w-full w-full h-full max-h-full`}>
      <ReactPlayer
        {...playerProps}
        ref={playerRef}
        playing
        controls
        url={`${youtubeVideoPrefixURL}${videoId}`}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default React.memo(VideoView)
