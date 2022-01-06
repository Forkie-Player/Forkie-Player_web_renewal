import React from 'react'
import ReactPlayer from 'react-player'
import { youtubeVideoPrefixURL } from '../../../lib/constants'
import { IVideoHasRange } from '../../../types'

interface IProps {
  reference: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  wrapper: {
    height: number
    width: number
  }
  onReady: () => void
}

function VideoView({ reference, video, wrapper, onReady }: IProps) {
  return (
    <div id="player_wrapper" className={`w-full h-3/5 bg-blackberry`}>
      <ReactPlayer
        ref={reference}
        playing
        controls
        loop
        url={`${youtubeVideoPrefixURL}${video.videoId}`}
        width={1.777 * wrapper.height}
        height={wrapper.height}
        onReady={onReady}
        style={{ marginLeft: (wrapper.width - 1.777 * wrapper.height) / 2 }}
      />
    </div>
  )
}

export default VideoView
