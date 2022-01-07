import React from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { youtubeVideoPrefixURL } from '../../../lib/constants'
import { IVideoHasRange } from '../../../types'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  wrapperRef: React.RefObject<HTMLDivElement>
  video: IVideoHasRange
  wrapper: {
    height: number
    width: number
  }
  playerProps?: ReactPlayerProps
}

function VideoView({ playerRef, wrapperRef, playerProps, video, wrapper }: IProps) {
  return (
    <div id="player_wrapper" ref={wrapperRef} className={`w-full h-3/5 bg-blackberry`}>
      <ReactPlayer
        {...playerProps}
        ref={playerRef}
        playing
        controls
        loop
        url={`${youtubeVideoPrefixURL}${video.videoId}`}
        width={1.777 * wrapper.height}
        height={wrapper.height}
        style={{ marginLeft: (wrapper.width - 1.777 * wrapper.height) / 2 }}
      />
    </div>
  )
}

export default VideoView
