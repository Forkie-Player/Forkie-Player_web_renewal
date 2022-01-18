import { useCallback, useMemo, useRef, useState } from 'react'
import { IVideoHasRange } from '../../types'
import LoadingElement from '../elements/loading'
import VideoContainer from '../video'
import { Range } from 'rc-slider'

import 'rc-slider/assets/index.css'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import palette from '../../lib/style/palette'
import { ITextButtonProps } from '../elements/CustomButton'

import * as Strings from '../../lib/strings'
import toast from 'react-hot-toast'
import AdjustSecondsContainer from './container/AdjustSecondsContainer'
import TimeLapseView from './view/TimeLapseView'
import ButtonsView from './view/ButtonsView'

// refactor : onReadyCallback 을 playerProps에서 따로 빼주는게 맞을까?
interface IProps {
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
  onReadyCallback?: (endtime: number) => void
  onRangeChangeCallback?: (range: number[]) => void
  leftButtonProps?: ITextButtonProps
  rightButtonProps?: ITextButtonProps
}

const handleStyle = {
  borderColor: palette.blackberry,
  width: '1.5rem',
  borderRadius: '0.5rem',
  ':hover': {
    backgroundColor: palette.redrose,
  },
}

function VideoEdit({
  video,
  playerProps,
  onReadyCallback,
  onRangeChangeCallback,
  leftButtonProps,
  rightButtonProps,
}: IProps) {
  const [videoReady, setVideoReady] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [range, setRange] = useState<number[]>([video.start, video.end])
  const playerRef = useRef<ReactPlayer>(null)

  const onReady = useCallback(() => {
    if (playerRef !== null && playerRef.current !== null) {
      const endTime = playerRef.current.getDuration()
      setVideoDuration(endTime)

      if (video.end === undefined || video.end === null || video.end === 0) {
        setRange([video.start, endTime])
      }

      if (onReadyCallback !== undefined) {
        onReadyCallback(endTime)
      }
    }
    setVideoReady(true)
  }, [playerRef, video, onReadyCallback])

  const onChangeRangeGraph = useCallback(
    (range: number[]) => {
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
    },
    [onRangeChangeCallback],
  )

  const onClickAdjustSeconds = useCallback(
    (right: boolean, offset: number) => {
      if (right) {
        setRange(prev => {
          if (prev[1] + offset <= videoDuration) {
            playerRef.current?.seekTo(prev[1] + offset)
            return [prev[0], prev[1] + offset]
          }
          return prev
        })
      } else {
        setRange(prev => {
          if (prev[0] + offset >= 0) {
            playerRef.current?.seekTo(prev[0] + offset)
            return [prev[0] + offset, prev[1]]
          }
          return prev
        })
      }
    },
    [videoDuration],
  )

  const onClickApply = useCallback(() => {
    setRange(prev => {
      if (leftButtonProps !== undefined && leftButtonProps.onClick !== undefined) {
        leftButtonProps.onClick(prev)
      }
      toast.success(Strings.applyTimeLapseSuccess(prev[0], prev[1]))
      return prev
    })
  }, [leftButtonProps])

  const playerPropsMemo = useMemo(() => ({ ...playerProps, onReady }), [playerProps, onReady])

  return (
    <div className="w-full h-full py-5">
      <VideoContainer playerRef={playerRef} playerProps={playerPropsMemo} video={video} />
      {videoReady ? (
        <div className="py-8 space-y-1 px-40">
          <Range
            value={range}
            max={videoDuration}
            onChange={onChangeRangeGraph}
            trackStyle={[{ backgroundColor: palette.redrose }]}
            handleStyle={[handleStyle, handleStyle]}
            railStyle={{ backgroundColor: palette['blackberry-lightest'] }}
          />
          <AdjustSecondsContainer onClickAdjustSeconds={onClickAdjustSeconds} />
          <TimeLapseView range={range} />
          <ButtonsView
            leftButtonProps={leftButtonProps}
            rightButtonProps={rightButtonProps}
            onClickApply={onClickApply}
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
