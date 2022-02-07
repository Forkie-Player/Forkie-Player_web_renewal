import { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeVideoOrderAsync, deleteVideoAsync, updateCurrentVideo } from '../../modules/video/actions'

import * as Constants from '../../lib/constants'
import useDispatchInteraction from '../../lib/hooks/useDispatchInteraction'
import { TVideoStoreType } from '../../modules/video/types'
import { IVideoInPlaylist } from '../../types'
import { DropResult } from 'react-beautiful-dnd'
import PlayContentContainer from './container/PlayContentContainer'
import { RootModuleType } from '../../modules/moduleTypes'

interface IProps {
  video: TVideoStoreType
}

export default function Play({ video }: IProps) {
  const [isPendingDeleteVideo, setIsPendingDeleteVideo] = useState<boolean>(false)
  const [isPendingChangeVideoOrder, setIsPendingChangeVideoOrder] = useState(false)

  const { items: videoList, currentVideo } = video
  const status = useDispatchInteraction(video)
  const playerRef = useRef<ReactPlayer>(null)
  const screenSize = useSelector((state: RootModuleType) => state.screenSize)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  // 입력으로 들어온 영상의 index를 반환. 없으면 -1를 반환.
  const getVideoIndex = useCallback(
    (curVideo: IVideoInPlaylist) => {
      return videoList.findIndex(v => v.id === curVideo.id)
    },
    [videoList],
  )

  const onVideoEnd = useCallback(() => {
    const curIndex = getVideoIndex(currentVideo)
    if (curIndex < videoList.length - 1) {
      return dispatch(updateCurrentVideo(videoList[curIndex + 1]))
    } else {
      return dispatch(updateCurrentVideo(videoList[0]))
    }
  }, [videoList, currentVideo, dispatch, getVideoIndex])

  /**
   * 사용자가 리스트에 있는 영상을 눌렀을때. 그 영상을 재생시킴
   */
  const onClickVideoListItem = useCallback(
    (item: IVideoInPlaylist) => {
      dispatch(updateCurrentVideo(item))
    },
    [dispatch],
  )

  /**
   * 비디오 삭제
   * 삭제 완료시
   *  첫번째 영상이면, 썸네일 변경
   *  남은 영상이 없으면, 재생목록으로 이동
   */
  const onClickDelete = useCallback(
    (item: IVideoInPlaylist) => {
      dispatch(deleteVideoAsync.request(item.id))
      setIsPendingDeleteVideo(true)
    },
    [dispatch],
  )

  useEffect(() => {
    if (isPendingDeleteVideo === true) {
      switch (status) {
        case 'SUCCESS':
          // 남은 영상이 없는 경우
          if (videoList.length === 0) {
            navigate(Constants.NavAbsolutePathItems.LIST)
          }
          setIsPendingDeleteVideo(false)
      }
    }
  }, [navigate, status, isPendingDeleteVideo, videoList])

  const onClickEdit = useCallback(
    (item: IVideoInPlaylist) => {
      navigate(Constants.NavAbsolutePathItems.VIDEO_EDIT, { state: item })
    },
    [navigate],
  )

  // 비디오 순서 변경
  const onVideoListDragEnd = useCallback(
    (result: DropResult) => {
      const from = result.source.index,
        to = result?.destination?.index
      if (from === to) {
        return
      }
      if (to !== undefined) {
        setIsPendingChangeVideoOrder(true)
        dispatch(changeVideoOrderAsync.request({ from: from, to: to }))
      }
    },
    [dispatch],
  )

  useEffect(() => {
    if (isPendingChangeVideoOrder) {
      switch (status) {
        case 'SUCCESS':
          setIsPendingChangeVideoOrder(false)
      }
    }
  }, [isPendingChangeVideoOrder, status])

  return (
    <PlayContentContainer
      playerRef={playerRef}
      screenSize={screenSize}
      currentVideo={currentVideo}
      videoList={videoList}
      isPendingChangeVideoOrder={isPendingChangeVideoOrder}
      onClickVideoListItem={onClickVideoListItem}
      onClickEdit={onClickEdit}
      onClickDelete={onClickDelete}
      onVideoListDragEnd={onVideoListDragEnd}
      onVideoEnd={onVideoEnd}
    />
  )
}
