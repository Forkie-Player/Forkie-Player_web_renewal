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

// refactor : onReadyCallback 을 playerProps에서 따로 빼주는게 맞을까?
interface IProps {
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
  onReadyCallback?: (endtime: number) => void
  onRangeChangeCallback?: (range: number[]) => void
  leftButtonProps?: ITextButtonProps
  onApplyButtonCallback?: (range: number[]) => void
  rightButtonProps?: ITextButtonProps
}

function VideoEdit({
  video,
  playerProps,
  onReadyCallback,
  onRangeChangeCallback,
  onApplyButtonCallback,
  leftButtonProps,
  rightButtonProps,
}: IProps) {
  const [videoReady, setVideoReady] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [range, setRange] = useState<number[]>([video.start, video.end])
  const [selectedLapse, setSelectedLapse] = useState<number[]>([video.start, video.end])

  const playerRef = useRef<ReactPlayer>(null)

  const onPlayerReady = useCallback(() => {
    if (playerRef !== null && playerRef.current !== null) {
      const endTime = playerRef.current.getDuration()
      setVideoDuration(endTime)

      if (video.end === undefined || video.end === null || video.end === 0) {
        setRange([video.start, endTime])
        setSelectedLapse([video.start, endTime])
      }

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
      if (onApplyButtonCallback !== undefined && onApplyButtonCallback !== undefined) {
        onApplyButtonCallback(prev)
      }
      toast.success(Strings.applyTimeLapseSuccess)
      setSelectedLapse(prev)
      return prev
    })
  }, [onApplyButtonCallback])

  const playerPropsMemo = useMemo(() => ({ ...playerProps, onReady: onPlayerReady }), [playerProps, onPlayerReady])
  const leftButtonPropsMemo = useMemo(
    () => ({ ...leftButtonProps, onClick: onClickApply }),
    [leftButtonProps, onClickApply],
  )

  // 로딩의 길이를 15rem으로 두고, 로딩이 끝나면 controller를 보여주면서 정확한 높이로 맞춰짐
  return (
    <div className="w-full h-full flex flex-col">
      <div className="w-full flex-1">
        <VideoContainer playerRef={playerRef} playerProps={playerPropsMemo} video={video} />
      </div>
      {videoReady ? (
        <div className="w-full max-h-fit pt-12 space-y-1 px-[10%]">
          <RangeContainer range={range} max={videoDuration} selectedLapse={selectedLapse} onChange={onChangeRange} />
          <AdjustSecondsContainer onClickAdjustSeconds={onClickAdjustRangeByOneSecond} />
          <TimeLapseView range={range} />
          <ButtonsView leftButtonProps={leftButtonPropsMemo} rightButtonProps={rightButtonProps} />
        </div>
      ) : (
        <div className="py-10 h-60">
          <LoadingElement />
        </div>
      )}
    </div>
  )
}

export default VideoEdit
