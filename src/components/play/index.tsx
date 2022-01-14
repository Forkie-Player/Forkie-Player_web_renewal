import { useCallback, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteVideoAsync } from '../../modules/video/actions'
import { IVideoInPlaylist } from '../../types'
import GobackLine from '../elements/GobackLine'
import VerticalLine from '../elements/VerticalLine'
import VideoInfo from '../elements/videoInfo'
import VideoRender from '../video'
import RightVideoListContainer from './container/RightVideoListContainer'

import * as Constants from '../../lib/constants'

interface IProps {
  videoList: IVideoInPlaylist[]
}

export default function Play({ videoList }: IProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const playerRef = useRef<ReactPlayer>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

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

  /**
   * 비디오 삭제
   * 삭제 완료시
   *  현재 재생중인 동영상이면, 다음 영상 재생(마지막 영상일 경우 첫번째 영상)
   *  현재 재생중인 동영상이 아니면, 현재 재생중인 동영상 유지
   *  첫번째 영상이면, 썸네일 변경
   *  남은 영상이 없으면, 재생목록으로 이동
   */
  const onClickDelete = useCallback(
    (index: number) => {
      dispatch(deleteVideoAsync.request(videoList[index].id))
    },
    [dispatch, videoList],
  )

  const onClickEdit = useCallback(
    (index: number) => {
      navigate(Constants.NavPathItems.VIDEO_TIMECHANGE, { state: videoList[index] })
    },
    [navigate, videoList],
  )

  return (
    <div className="w-full h-full max-h-full pr-[5%] grid grid-cols-12 grid-rows-[2rem_minmax(100px,_auto)]">
      <div className="col-span-12">
        <GobackLine />
      </div>
      <div className="col-span-9 pt-4 space-y-4">
        <VideoRender playerRef={playerRef} video={videoList[currentVideoIndex]} playerProps={{ onEnded: onVideoEnd }} />
        <VideoInfo data={videoList[currentVideoIndex]} />
      </div>
      <div className="h-full max-h-full col-span-3 flex">
        <VerticalLine />
        <RightVideoListContainer
          videoList={videoList}
          currentVideoIndex={currentVideoIndex}
          onClickVideoListItem={onClickVideoListItem}
          onClickDelete={onClickDelete}
          onClickEdit={onClickEdit}
        />
      </div>
    </div>
  )
}
