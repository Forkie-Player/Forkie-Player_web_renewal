// 검색 화면에서 넘어온 비디오 추가 화면

import { IVideo, IVideoHasRange } from '../../types'
import * as Strings from '../../lib/strings'
import { useNavigate } from 'react-router-dom'
import VideoEdit from '../videoEdit'
import { useState } from 'react'

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
    setSelectedRange([0, endTime])
  }

  const onChangeSelectedRange = (range: number[]) => {
    setSelectedRange(range)
  }

  return (
    <div className="w-full h-full px-[5%]">
      <div
        className="w-fit p-1 rounded-xl text-md cursor-pointer hover:shadow-outer hover:bg-background-light-hover"
        onClick={goback}
      >
        {Strings.GoBack}
      </div>
      <VideoEdit video={{ ...video, start: 0, end: 0 }} selectedRange={selectedRange} onReadyCallback={onPlayerReady} />
    </div>
  )
}

export default VideoAdd
