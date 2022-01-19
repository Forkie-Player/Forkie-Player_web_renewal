import { useCallback, useMemo, useRef, useState } from 'react'
import { IVideoHasRange } from '../../types'
import LoadingElement from '../elements/loading'
import VideoContainer from '../video'

import 'rc-slider/assets/index.css'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { ITextButtonProps } from '../elements/CustomButton'

import * as Strings from '../../lib/strings'
import toast from 'react-hot-toast'
import AdjustSecondsContainer from './container/AdjustSecondsContainer'
import TimeLapseView from './view/TimeLapseView'
import ButtonsView from './view/ButtonsView'
import RangeContainer from './container/RangeContainer'

import LapseIndicatorContainer from './container/LapseIndicatorContainer'
import { useResizeDetector } from 'react-resize-detector'

// refactor : onReadyCallback 을 playerProps에서 따로 빼주는게 맞을까?
interface IProps {
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
  onReadyCallback?: (endtime: number) => void
  onRangeChangeCallback?: (range: number[]) => void
  leftButtonProps?: ITextButtonProps
  rightButtonProps?: ITextButtonProps
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
  const [selectedLapse, setSelectedLapse] = useState<number[]>([video.start, video.end])

  const [updateIndicator, setUpdateIndicator] = useState<number>(0)

  const playerRef = useRef<ReactPlayer>(null)
  const startHandleRef = useRef<HTMLDivElement>(null)
  const endHandleRef = useRef<HTMLDivElement>(null)

  // 사이즈 변경시 인디케이터 업데이트
  // 이때 range 범위도 사용자가 적용한 시간으로 다시 돌아감.
  const updateIndicatorWithUseCallback = useCallback(() => {
    setUpdateIndicator(prev => prev + 1)
    setRange(selectedLapse)
  }, [selectedLapse])
  const resizeDetector = useResizeDetector({
    onResize: updateIndicatorWithUseCallback,
  })

  const onPlayerReady = useCallback(() => {
    if (playerRef !== null && playerRef.current !== null) {
      const endTime = playerRef.current.getDuration()
      setVideoDuration(endTime)

      if (video.end === undefined || video.end === null || video.end === 0) {
        setRange([video.start, endTime])
        setSelectedLapse([video.start, endTime])
      }
      setUpdateIndicator(prev => prev + 1)

      if (onReadyCallback !== undefined) {
        onReadyCallback(endTime)
      }
    }
    setVideoReady(true)
  }, [playerRef, video, onReadyCallback])

  const onChangeRange = useCallback(
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

  const onClickAdjustRangeByOneSecond = useCallback(
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
      toast.success(Strings.applyTimeLapseSuccess)
      setSelectedLapse(prev)
      return prev
    })
    setUpdateIndicator(prev => prev + 1)
  }, [leftButtonProps])

  const playerPropsMemo = useMemo(() => ({ ...playerProps, onReady: onPlayerReady }), [playerProps, onPlayerReady])
  const lapseIndicatorRefsMemo = useMemo(() => [startHandleRef, endHandleRef], [startHandleRef, endHandleRef])
  const leftButtonPropsMemo = useMemo(
    () => ({ ...leftButtonProps, onClick: onClickApply }),
    [leftButtonProps, onClickApply],
  )

  return (
    <div className="w-full h-full py-5">
      <VideoContainer playerRef={playerRef} playerProps={playerPropsMemo} video={video} />
      {videoReady ? (
        <div ref={resizeDetector.ref} className="w-full pt-12 space-y-1 px-[10%]">
          <RangeContainer
            handleRefs={[startHandleRef, endHandleRef]}
            range={range}
            max={videoDuration}
            onChange={onChangeRange}
          />
          <AdjustSecondsContainer onClickAdjustSeconds={onClickAdjustRangeByOneSecond} />
          <TimeLapseView range={range} />
          <ButtonsView leftButtonProps={leftButtonPropsMemo} rightButtonProps={rightButtonProps} />
          <LapseIndicatorContainer
            updateIndicator={updateIndicator}
            refs={lapseIndicatorRefsMemo}
            range={selectedLapse}
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
