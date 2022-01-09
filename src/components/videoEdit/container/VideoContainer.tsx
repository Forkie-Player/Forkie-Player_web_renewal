import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { IVideoHasRange } from '../../../types'
import VideoView from '../view/VideoView'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
}

// 비디오 렌더 컴포넌트
// 나중에 따로 폴더로 파기
function VideoContainer({ playerRef, video, playerProps }: IProps) {
  const [videoReady, setVideoReady] = useState(false)
  useEffect(() => {
    if (videoReady && playerRef.current !== null) {
      if (playerRef?.current?.seekTo !== undefined && playerRef.current.seekTo !== null) {
        playerRef.current.seekTo(video.start)
      }
      const intervalId = setInterval(() => {
        const curTime = playerRef.current?.getCurrentTime()
        if (curTime !== undefined && curTime >= video.end && playerRef.current !== null) {
          playerRef.current.seekTo(video.start)
        }
      }, 1000)

      return () => {
        if (intervalId !== undefined) {
          clearInterval(intervalId)
        }
      }
    }
  }, [playerRef, videoReady, video])

  const onVideReady = useCallback(
    e => {
      if (playerProps !== undefined && playerProps.onReady) {
        playerProps.onReady(e)
      }
      setVideoReady(true)
    },
    [playerProps],
  )

  return <VideoView playerRef={playerRef} playerProps={playerProps} video={video} onReady={onVideReady} />
}

export default VideoContainer
