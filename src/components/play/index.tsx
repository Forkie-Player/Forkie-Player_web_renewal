import { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteVideoAsync } from '../../modules/video/actions'
import GobackLine from '../elements/GobackLine'
import VerticalLine from '../elements/VerticalLine'
import RightVideoListContainer from './container/RightVideoListContainer'

import * as Constants from '../../lib/constants'
import useDispatchInteraction from '../../lib/hooks/useDispatchInteraction'
import { TVideoStoreType } from '../../modules/video/types'
import { clearThumbnail, setThumbnail } from '../../modules/playlist/actions'
import LeftVideoRenderView from './view/LeftVideoRenderView'

interface IProps {
  video: TVideoStoreType
}

export default function Play({ video }: IProps) {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0)
  const [inProgressingDeleteIdx, setInProgressingDeleteIdx] = useState<number | null>(null)

  const { items: videoList } = video
  const status = useDispatchInteraction(video)
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
      setInProgressingDeleteIdx(index)
    },
    [dispatch, videoList],
  )

  useEffect(() => {
    if (inProgressingDeleteIdx !== null) {
      switch (status) {
        case 'SUCCESS':
          setInProgressingDeleteIdx(null)
          if (currentVideoIndex > inProgressingDeleteIdx) {
            setCurrentVideoIndex(currentVideoIndex - 1)
          } else if (currentVideoIndex === inProgressingDeleteIdx) {
            if (currentVideoIndex >= videoList.length) {
              setCurrentVideoIndex(0)
            }
          }
          if (inProgressingDeleteIdx === 0) {
            if (videoList.length === 0) {
              if (video.playlistId !== null) {
                dispatch(clearThumbnail(video.playlistId))
              }
              navigate(-1)
            } else {
              if (video.playlistId !== null) {
                dispatch(setThumbnail(video.playlistId, videoList[0].thumbnail))
              }
            }
          }
      }
    }
  }, [navigate, status, inProgressingDeleteIdx, currentVideoIndex, video.playlistId, videoList, dispatch])

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
        <LeftVideoRenderView playerRef={playerRef} video={videoList[currentVideoIndex]} onVideoEnd={onVideoEnd} />
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
