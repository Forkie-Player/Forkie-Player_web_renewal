import React, { useEffect, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { useResizeDetector } from 'react-resize-detector'
import { youtubeVideoPrefixURL } from '../../../lib/constants'
import { IVideoHasRange } from '../../../types'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
}

function VideoView({ playerRef, playerProps, video }: IProps) {
  const resizeDetector = useResizeDetector()
  const [wrapper, setWrapper] = useState({ width: 640, height: 360 })

  useEffect(() => {
    setWrapper(prev => {
      if (resizeDetector.width !== undefined && resizeDetector.height !== undefined) {
        if (resizeDetector.width !== prev.width || resizeDetector.height !== prev.height) {
          return { width: resizeDetector.width, height: resizeDetector.height }
        }
      }
      return prev
    })
  }, [resizeDetector])

  return (
    <div id="player_wrapper" ref={resizeDetector.ref} className={`w-full h-3/5 bg-blackberry`}>
      <ReactPlayer
        {...playerProps}
        ref={playerRef}
        playing
        controls
        url={`${youtubeVideoPrefixURL}${video.videoId}`}
        width={1.777 * wrapper.height}
        height={wrapper.height}
        style={{ marginLeft: (wrapper.width - 1.777 * wrapper.height) / 2 }}
      />
    </div>
  )
}

export default VideoView
