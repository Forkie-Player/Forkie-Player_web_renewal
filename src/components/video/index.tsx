/**
 * 비디오 렌더 컴포넌트
 * 넘어온 비디오의 start, end에 맞추어 재생해줌
 * 정해진 end 에 도달하면, playerProps의 onEnded 이벤트를 발생시킴
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { IVideoHasRange } from '../../types'
import VideoView from './view/VideoView'

import './index.css'

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

  const seekTo = useCallback(
    (to: number) => {
      if (playerRef.current !== null) {
        playerRef.current.seekTo(to, 'seconds')
      }
    },
    [playerRef],
  )

  /**
   * 비디오의 end 로 지정한 시간에 도달하면, onEnded 이벤트를 발생시키고
   * seekToStart을 호출하여 start로 이동
   */
  useEffect(() => {
    if (playerRef.current !== null) {
      const intervalId = setInterval(() => {
        const curTime = playerRef.current?.getCurrentTime()
        if (curTime !== undefined && curTime >= video?.end) {
          seekTo(video.start)
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
  }, [playerRef, video, playerProps, seekTo])

  /**
   * videoId가 변경되면, 영상을 다시 로드해야함. 같으면 할 필요없음.
   * 따라서 prevVideo와 video.videoId를 비교하여 변경되었는지 확인하고,
   * 변경되었으면, ready 상태를 false로 바꾸어 줌.
   */
  useEffect(() => {
    if (prevVideo !== video.videoId) {
      setVideoReady(false)
      setPrevVideo(video.videoId)
      return
    }
    /**
     * 비디오가 ready이면 처음으로 이동.
     * 발생하는 경우
     *  1. 새로운 비디오거나, 이전과 다른 비디오가 로드되었을 때
     *  2. 이전과 같은 비디오로 변경되었을때.(이전에 ready 된 상태가 그대로 남음)
     */
    if (videoReady) {
      seekTo(video.start)
    }
  }, [video, prevVideo, videoReady, seekTo])

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
    seekTo(video.start)
    if (playerProps !== undefined && playerProps.onEnded !== undefined) {
      playerProps.onEnded()
    }
  }, [playerProps, seekTo, video])

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
