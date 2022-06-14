import React from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { reactPlayerPrefixURL } from '../../../lib/constants'
import { SearchPlatformType } from '../../../types'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  videoId: string
  platform: SearchPlatformType
  playerProps?: ReactPlayerProps
}

function VideoView({ playerRef, playerProps, videoId, platform = 'YOUTUBE' }: IProps) {
  return (
    <div id="player_wrapper" className={`max-w-full w-full h-full max-h-full`}>
      <ReactPlayer
        {...playerProps}
        ref={playerRef}
        playing
        controls
        url={`${reactPlayerPrefixURL[platform]}${videoId}`}
        width="100%"
        height="100%"
      />
    </div>
  )
}

export default React.memo(VideoView)
