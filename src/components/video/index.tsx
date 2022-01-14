/**
 * 비디오 렌더 컴포넌트
 * 넘어온 비디오의 start, end에 맞추어 재생해줌
 * 정해진 end 에 도달하면, playerProps의 onEnded 이벤트를 발생시킴
 */

import React, { useCallback, useEffect, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { IVideoHasRange } from '../../types'
import VideoView from './view/VideoView'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
}

function VideoRender({ playerRef, video, playerProps }: IProps) {
  const [prevVideo, setPrevVideo] = useState<string>(video.videoId)
  const [videoReady, setVideoReady] = useState(false)

  const seekToStart = useCallback(() => {
    if (videoReady && playerRef.current !== null && video.start < video.end) {
      playerRef.current.seekTo(video.start, 'seconds')
    }
  }, [playerRef, videoReady, video])

  useEffect(() => {
    if (prevVideo !== video.videoId) {
      setVideoReady(false)
      setPrevVideo(video.videoId)
      return
    }

    if (videoReady && playerRef.current !== null) {
      seekToStart()

      const intervalId = setInterval(() => {
        const curTime = playerRef.current?.getCurrentTime()
        if (curTime !== undefined && curTime >= video.end) {
          seekToStart()
          if (playerProps !== undefined && playerProps.onEnded !== undefined) {
            playerProps.onEnded()
          }
        }
      }, 700)

      return () => {
        if (intervalId !== undefined) {
          clearInterval(intervalId)
        }
      }
    }
  }, [playerRef, videoReady, prevVideo, video, playerProps, seekToStart])

  const onVideoReady = useCallback(
    e => {
      if (playerProps !== undefined && playerProps.onReady !== undefined) {
        playerProps.onReady(e)
      }
      setVideoReady(true)
    },
    [playerProps],
  )

  const onVideoEnded = useCallback(() => {
    if (playerProps !== undefined && playerProps.onEnded !== undefined) {
      playerProps.onEnded()
    }
    seekToStart()
  }, [playerProps, seekToStart])

  return (
    <VideoView
      playerRef={playerRef}
      playerProps={{
        ...playerProps,
        onReady: onVideoReady,
        onEnded: onVideoEnded,
      }}
      video={video}
    />
  )
}

export default VideoRender
