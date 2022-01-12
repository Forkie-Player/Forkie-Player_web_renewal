import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { IVideoHasRange } from '../../types'
import VideoView from './view/VideoView'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  onVideoEnd?: () => void | Promise<void>
  playerProps?: ReactPlayerProps
}

// 비디오 렌더 컴포넌트
function VideoRender({ playerRef, video, playerProps, onVideoEnd }: IProps) {
  const [prevVideo, setPrevVideo] = useState<string | null>(null)
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
          if (onVideoEnd !== undefined) {
            onVideoEnd()
          }
        }
      }, 700)
      setPrevVideo(video.videoId)

      return () => {
        if (intervalId !== undefined) {
          clearInterval(intervalId)
        }
      }
    }
  }, [playerRef, videoReady, video, onVideoEnd])

  // 이전 이후 영상이 다를 경우 reReady
  useEffect(() => {
    if (prevVideo !== null && prevVideo !== video.videoId) {
      setVideoReady(false)
    }
  }, [video.videoId, prevVideo])

  const onVideoReady = useCallback(
    e => {
      if (playerProps !== undefined && playerProps.onReady) {
        playerProps.onReady(e)
      }
      setVideoReady(true)
    },
    [playerProps],
  )

  return (
    <VideoView
      playerRef={playerRef}
      playerProps={{
        ...playerProps,
        onReady: onVideoReady,
      }}
      video={video}
    />
  )
}

export default VideoRender
