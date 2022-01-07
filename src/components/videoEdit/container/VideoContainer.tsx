import React, { useEffect, useRef, useState } from 'react'
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
  const [wrapper, setWrapper] = useState({ height: 360, width: 640 })
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const getWrapper = () => {
      const wrapper = wrapperRef.current?.getBoundingClientRect()
      if (wrapper !== null && wrapper !== undefined) {
        setWrapper({ width: wrapper.width, height: wrapper.height })
      }
    }
    window.addEventListener('resize', getWrapper)
    getWrapper()

    return () => {
      window.removeEventListener('resize', getWrapper)
    }
  }, [wrapperRef])

  return (
    <VideoView
      playerRef={playerRef}
      wrapperRef={wrapperRef}
      playerProps={playerProps}
      video={video}
      wrapper={wrapper}
    />
  )
}

export default VideoContainer
