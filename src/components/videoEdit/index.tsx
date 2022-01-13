import { useCallback, useMemo, useRef, useState } from 'react'
import { IVideoHasRange } from '../../types'
import LoadingElement from '../elements/loading'
import VideoContainer from '../video'
import { Range } from 'rc-slider'

import 'rc-slider/assets/index.css'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import palette from '../../lib/style/palette'
import AdjustSeconds from './elements/AdjustSeconds'
import { CustomButton, ITextButtonProps } from '../elements/CustomButton'

import * as Strings from '../../lib/strings'
import toast from 'react-hot-toast'
import { TimeLapse } from '../elements/TimeLapse'

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
  const [range, setRange] = useState<number[]>([-100, -100])
  const playerRef = useRef<ReactPlayer>(null)

  const onReady = useCallback(() => {
    if (playerRef !== null && playerRef.current !== null) {
      const endTime = playerRef.current.getDuration()
      setVideoDuration(endTime)

      /* refactor : end가 0이 아니면 정해진 end로 range의 끝을 정함
        end가 0이면 영상의 끝으로 range의 끝을 정함
        상위모듈인 videoAdd 에서 end를 꼭 0으로 넣어주어야하는 하위 모듈로의 의존성이 생김
      */
      setRange([video.start, video.end !== 0 ? video.end : endTime])
      // 다음에 고치자.

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
            onChange={onChangeRange}
            trackStyle={[{ backgroundColor: palette.redrose }]}
            handleStyle={[handleStyle, handleStyle]}
            railStyle={{ backgroundColor: palette['blackberry-lightest'] }}
          />
          <div className="w-full flex justify-between">
            <AdjustSeconds onClickAdjustSeconds={onClickAdjustSeconds} />
            <AdjustSeconds right onClickAdjustSeconds={onClickAdjustSeconds} />
          </div>
          <div className="max-w-fit mx-auto text-3xl">
            <TimeLapse range={range} />
          </div>
          <div className="w-full pt-4 flex text-3xl justify-center gap-x-8">
            <CustomButton
              text="적용"
              size="large"
              textColor={palette['info']}
              {...leftButtonProps}
              onClick={onClickApply}
            />
            <CustomButton text="추가" size="large" textColor={palette['redrose']} {...rightButtonProps} />
          </div>
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
