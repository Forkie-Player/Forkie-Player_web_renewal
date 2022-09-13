/**
 * 비디오 수정 컴포넌트
 *
 */

import { useCallback, useMemo, useRef, useState } from 'react'
import { IVideoHasRange } from '../../types'
import LoadingElement from '../elements/loading'
import VideoContainer from '../video'

import 'rc-slider/assets/index.css'
import ReactPlayer, { ReactPlayerProps } from 'react-player'
import { ITextButtonProps } from '../elements/CustomButton'

import TimeLapseView from './view/TimeLapseView'
import RangeContainer from './container/RangeContainer'
import AdjustSecondsView from './view/AdjustSecondsView'
import { useSelector } from 'react-redux'
import { RootModuleType } from '../../modules/moduleTypes'
import ButtonsContainer from './container/ButtonsContainer'
import { infiniteEndTime } from '../../lib/constants'

interface IProps {
  video: IVideoHasRange
  playerProps?: ReactPlayerProps
  completeButtonProps?: ITextButtonProps
  onRangeChangeCallback?: (range: number[]) => void
}

function VideoEdit({ video, playerProps, completeButtonProps, onRangeChangeCallback }: IProps) {
  const [videoReady, setVideoReady] = useState(false)
  // 비디오 전체 길이
  const [videoDuration, setVideoDuration] = useState(0)
  // 사용자가 선택하고, 적용하지는 않은 범위
  const [range, setRange] = useState<number[]>([video.start, video.end])
  // 사용자가 적용한 범위
  const [selectedLapse, setSelectedLapse] = useState<number[]>([video.start, video.end])

  const screenSize = useSelector(({ screenSize }: RootModuleType) => screenSize)
  const playerRef = useRef<ReactPlayer>(null)

  // 비디오가 로드되었을때 실행.
  const onPlayerDuration = useCallback(
    (duration: number) => {
      if (duration) {
        duration = Math.floor(duration)
        setVideoDuration(duration)

        if (video.end === undefined || video.end === null || video.end === infiniteEndTime) {
          setRange([video.start, duration])
          setSelectedLapse([video.start, duration])
        }

        if (playerProps !== undefined && playerProps.onDuration !== undefined) {
          playerProps.onDuration(duration)
        }
      }
      setVideoReady(true)
    },
    [video, playerProps],
  )

  // 슬라이더로 범위조절 시 호출
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

      setSelectedLapse(range)

      if (onRangeChangeCallback !== undefined) {
        onRangeChangeCallback(range)
      }
    },
    [onRangeChangeCallback],
  )

  // 버튼으로 범위조절 시 호출
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

  const playerPropsMemo = useMemo(
    () => ({ ...playerProps, onDuration: onPlayerDuration }),
    [playerProps, onPlayerDuration],
  )

  // 로딩의 길이를 15rem으로 두고, 로딩이 끝나면 controller를 보여주면서 정확한 높이로 맞춰짐
  return (
    <div className="mr-2 flex h-full flex-col pb-1">
      <div className="w-full flex-1">
        <VideoContainer
          playerRef={playerRef}
          playerProps={playerPropsMemo}
          video={video}
          intervalMs={videoDuration + 9999999}
        />
      </div>
      <div className="max-h-fit w-full space-y-1 px-[10%] pt-10 2xl:pt-12">
        {videoReady ? (
          <>
            <RangeContainer range={range} max={videoDuration} selectedLapse={selectedLapse} onChange={onChangeRange} />
            <AdjustSecondsView onClickAdjustSeconds={onClickAdjustRangeByOneSecond} />
            <TimeLapseView range={range} />
            <ButtonsContainer completeButtonProps={completeButtonProps} screenSize={screenSize} />
          </>
        ) : (
          <LoadingElement className="py-10" />
        )}
      </div>
    </div>
  )
}

export default VideoEdit
