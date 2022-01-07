// 검색 화면에서 넘어온 비디오 추가 화면

import { IVideo } from '../../types'
import * as Strings from '../../lib/strings'
import { useNavigate } from 'react-router-dom'
import VideoEdit from '../videoEdit'
import { useCallback, useState } from 'react'

interface IProps {
  video: IVideo
}

function VideoAdd({ video }: IProps) {
  const [selectedRange, setSelectedRange] = useState([0, 0])
  const navigate = useNavigate()

  const goback = () => {
    navigate(-1)
  }

  const onPlayerReady = (endTime: number) => {
    if (endTime) setSelectedRange([0, endTime])
  }

  const onClickApply = useCallback((range: number[]) => {
    setSelectedRange(range)
  }, [])

  const onClickAdd = useCallback(() => {
    console.log('add')
  }, [])

  return (
    <div className="w-full h-full px-[5%]">
      <div
        className="unselectable w-fit p-1 rounded-xl text-md cursor-pointer hover:shadow-outer hover:bg-background-light-hover"
        onClick={goback}
      >
        {Strings.GoBack}
      </div>
      <VideoEdit
        video={{ ...video, start: 0, end: 0 }}
        selectedRange={selectedRange}
        onReadyCallback={onPlayerReady}
        onClickApplyCallback={onClickApply}
        onClickAddCallback={onClickAdd}
      />
    </div>
  )
}

export default VideoAdd
