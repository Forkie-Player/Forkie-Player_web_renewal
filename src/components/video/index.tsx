/**
 * 비디오 렌더 컴포넌트
 * 넘어온 비디오의 start, end에 맞추어 재생해줌
 * 정해진 end 에 도달하면, playerProps의 onEnded 이벤트를 발생시킴
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { IVideoHasRange } from '../../types'
import VideoView from './view/VideoView'

interface IProps {
  playerRef: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
}

/**
 * seekTo는 같은 영상을 대상으로도 일어날 수 있어야함(영상 1개만 등록한 경우)
 * 같은 영상 -> 같은 영상 : onReady, onStart가 발생하지 않음
 */

function VideoRender({ playerRef, video, playerProps }: IProps) {
  const [prevVideo, setPrevVideo] = useState<string>(video.videoId)
  const [videoReady, setVideoReady] = useState(false)

  const seekToStart = useCallback(() => {
    if (playerRef.current !== null && video.start < video.end) {
      playerRef.current.seekTo(video.start, 'seconds')
    }
  }, [playerRef, video])

  useEffect(() => {
    if (playerRef.current !== null) {
      const intervalId = setInterval(() => {
        const curTime = playerRef.current?.getCurrentTime()
        if (curTime !== undefined && curTime >= video?.end) {
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
  }, [playerRef, video, playerProps, seekToStart])

  useEffect(() => {
    if (prevVideo !== video.videoId) {
      setVideoReady(false)
      setPrevVideo(video.videoId)
      return
    }

    if (videoReady) {
      seekToStart()
    }
  }, [video, prevVideo, videoReady, seekToStart])

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

  const playerPropsMemo = useMemo(
    () => ({
      ...playerProps,
      onReady: onVideoReady,
      onEnded: onVideoEnded,
    }),
    [playerProps, onVideoEnded, onVideoReady],
  )

  return <VideoView playerRef={playerRef} playerProps={playerPropsMemo} video={video} />
}

export default VideoRender
