import { useCallback, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { IVideoHasRange } from '../../types'
import GobackLine from '../elements/GobackLine'
import VerticalLine from '../elements/VerticalLine'
import VideoInfo from '../elements/videoInfo'
import VideoRender from '../video'
import RightVideoListContainer from './container/RightVideoListContainer'

interface IProps {
  videoList: IVideoHasRange[]
}

export default function Play({ videoList }: IProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const playerRef = useRef<ReactPlayer>(null)

  const onVideoEnd = useCallback(() => {
    setCurrentVideoIndex(prev => {
      if (prev + 1 < videoList.length) {
        return prev + 1
      } else {
        return 0
      }
    })
  }, [videoList.length])

  const onClickVideoListItem = useCallback((itemIndex: number) => {
    setCurrentVideoIndex(itemIndex)
  }, [])

  return (
    <div className="w-full h-full max-h-full pr-[5%] grid grid-cols-12 grid-rows-[2rem_minmax(100px,_auto)]">
      <div className="col-span-12">
        <GobackLine />
      </div>
      <div className="col-span-9 pt-4 space-y-4">
        <VideoRender playerRef={playerRef} video={videoList[currentVideoIndex]} onVideoEnd={onVideoEnd} />
        <VideoInfo data={videoList[currentVideoIndex]} />
      </div>
      <div className="h-full max-h-full col-span-3 flex">
        <VerticalLine />
        <RightVideoListContainer
          videoList={videoList}
          currentVideoIndex={currentVideoIndex}
          onClickVideoListItem={onClickVideoListItem}
        />
      </div>
    </div>
  )
}
