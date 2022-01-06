import React, { useEffect, useState } from 'react'
import ReactPlayer from 'react-player'
import { IVideoHasRange } from '../../../types'
import VideoView from '../view/VideoView'

interface IProps {
  reference: React.RefObject<ReactPlayer>
  video: IVideoHasRange
  onReady: () => void
}

function VideoContainer({ reference, video, onReady }: IProps) {
  const [wrapper, setWrapper] = useState({ height: 360, width: 640 })

  useEffect(() => {
    const getWrapper = () => {
      const wrapper = document.getElementById('player_wrapper')?.getBoundingClientRect()
      if (wrapper !== null && wrapper !== undefined) {
        setWrapper({ width: wrapper.width, height: wrapper.height })
      }
    }
    window.addEventListener('resize', getWrapper)
    getWrapper()

    return () => {
      window.removeEventListener('resize', getWrapper)
    }
  }, [])

  return <VideoView reference={reference} video={video} onReady={onReady} wrapper={wrapper} />
}

export default VideoContainer
