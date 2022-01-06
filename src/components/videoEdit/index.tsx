import { useRef, useState } from 'react'
import { IVideoHasRange } from '../../types'
import LoadingElement from '../elements/loading'
import VideoContainer from './container/VideoContainer'
import { Range } from 'rc-slider'

import 'rc-slider/assets/index.css'
import ReactPlayer from 'react-player'
import palette from '../../lib/style/palette'

interface IProps {
  video: IVideoHasRange
  selectedRange: number[]
  onReadyCallback?: (endtime: number) => void
  onRangeChangeCallback?: (range: number[]) => void
}

const handleStyle = {
  borderColor: palette.blackberry,
  width: '1.5rem',
  borderRadius: '0.5rem',
  ':hover': {
    backgroundColor: palette.redrose,
  },
}

function VideoEdit({ video, selectedRange, onReadyCallback, onRangeChangeCallback }: IProps) {
  const [videoReady, setVideoReady] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [range, setRange] = useState([-100, -100])
  const playerRef = useRef<ReactPlayer>(null)

  const onReady = () => {
    if (playerRef !== null && playerRef.current !== null) {
      const endTime = playerRef.current.getDuration()
      setVideoDuration(endTime)
      // 이부분 나중에 고치기
      setRange([video.start, video.end !== 0 ? video.end : endTime])
      if (onReadyCallback !== undefined) {
        onReadyCallback(endTime)
      }
    }
    setVideoReady(true)
  }
  const onChangeRange = (range: number[]) => {
    setRange(prev => {
      if (range[0] === prev[0]) {
        playerRef.current?.seekTo(range[1])
      } else if (range[1] === prev[1]) {
        playerRef.current?.seekTo(range[0])
      }
      return range
    })
    if (onRangeChangeCallback !== undefined) {
      onRangeChangeCallback(range)
    }
  }

  return (
    <div className="w-full h-full py-5">
      <VideoContainer reference={playerRef} video={video} onReady={onReady} />
      {videoReady ? (
        <div className="py-8 space-y-2 px-40">
          <Range
            value={range}
            max={videoDuration}
            onChange={onChangeRange}
            trackStyle={[{ backgroundColor: palette.redrose }]}
            handleStyle={[handleStyle, handleStyle]}
            railStyle={{ backgroundColor: palette['blackberry-lightest'] }}
          />
        </div>
      ) : (
        <div className="py-10">
          <LoadingElement />
        </div>
      )}
    </div>
  )
}

export default VideoEdit
