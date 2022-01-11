import { useCallback, useRef, useState } from 'react'
import { IVideoHasRange } from '../../types'
import LoadingElement from '../elements/loading'
import VideoContainer from './container/VideoContainer'
import { Range } from 'rc-slider'

import 'rc-slider/assets/index.css'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import palette from '../../lib/style/palette'
import secondsToHHMMSS from '../../lib/utils/secondsToHHMMSS'
import AdjustSeconds from './elements/AdjustSeconds'
import { CustomButton } from '../elements/CustomButton'

import * as Strings from '../../lib/strings'
import toast from 'react-hot-toast'

// refactor : onReadyCallback 을 playerProps에서 따로 빼주는게 맞을까?
interface IProps {
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
  onReadyCallback?: (endtime: number) => void
  onRangeChangeCallback?: (range: number[]) => void
  onClickApplyCallback: (range: number[]) => void
  onClickAddCallback: () => void
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
  onClickApplyCallback,
  onClickAddCallback,
}: IProps) {
  const [videoReady, setVideoReady] = useState(false)
  const [videoDuration, setVideoDuration] = useState(0)
  const [range, setRange] = useState([-100, -100])
  const playerRef = useRef<ReactPlayer>(null)

  const onReady = useCallback(() => {
    if (playerRef !== null && playerRef.current !== null) {
      const endTime = playerRef.current.getDuration()
      setVideoDuration(endTime)

      /* refactor : end가 0이 아니면 정해진 end로 range의 끝을 정함
        end가 0이면 영상의 끝으로 range의 끝을 정함
      */
      setRange([video.start, video.end !== 0 ? video.end : endTime])
      // 다음에 고치자.

      if (onReadyCallback !== undefined) {
        onReadyCallback(endTime)
      }
    }
    setVideoReady(true)
  }, [playerRef, video, onReadyCallback])

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
      onClickApplyCallback(prev)
      toast.success(Strings.applyTimeLapseSuccess(prev[0], prev[1]))
      return prev
    })
  }, [onClickApplyCallback])

  return (
    <div className="w-full h-full py-5">
      <VideoContainer playerRef={playerRef} playerProps={{ ...playerProps, onReady }} video={video} />
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
          <div className="unselectable w-full flex text-3xl justify-center gap-x-8">
            <div>{secondsToHHMMSS(range[0])}</div>~<div>{secondsToHHMMSS(range[1])}</div>
          </div>
          <div className="w-full pt-4 flex text-3xl justify-center gap-x-8">
            <CustomButton text="적용" size="large" textColor={palette['info']} onClick={onClickApply} />
            <CustomButton text="추가" size="large" textColor={palette['redrose']} onClick={onClickAddCallback} />
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
