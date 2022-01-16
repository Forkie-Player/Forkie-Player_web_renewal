import { useCallback, useEffect, useRef, useState } from 'react'
import ReactPlayer from 'react-player'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { changeVideoOrderAsync, deleteVideoAsync, updateCurrentVideo } from '../../modules/video/actions'
import GobackLine from '../elements/GobackLine'
import VerticalLine from '../elements/VerticalLine'

import * as Constants from '../../lib/constants'
import useDispatchInteraction from '../../lib/hooks/useDispatchInteraction'
import { TVideoStoreType } from '../../modules/video/types'
import { clearThumbnail, setThumbnail } from '../../modules/playlist/actions'
import LeftVideoRenderView from './view/LeftVideoRenderView'
import { IVideoInPlaylist } from '../../types'
import RightVideoListContainer from './container/RightVideoListContainer'
import { DropResult } from 'react-beautiful-dnd'
import { IChangeVideoOrderInPlaylistRequest } from '../../lib/api/types'
import LoadingElement from '../elements/loading'

interface IProps {
  video: TVideoStoreType
}

export default function Play({ video }: IProps) {
  const [inProgressingDeleteIdx, setInProgressingDeleteIdx] = useState<number | null>(null)
  const [isPendingChangeVideoOrder, setIsPendingChangeVideoOrder] = useState(false)

  const { items: videoList, currentVideo } = video
  const status = useDispatchInteraction(video)
  const playerRef = useRef<ReactPlayer>(null)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const getVideoIndex = useCallback(
    (curVideo: IVideoInPlaylist) => {
      return videoList.findIndex(v => v.id === curVideo.id)
    },
    [videoList],
  )

  const onVideoEnd = useCallback(() => {
    const curIndex = getVideoIndex(currentVideo)
    if (curIndex < videoList.length) {
      return dispatch(updateCurrentVideo(videoList[curIndex + 1]))
    } else {
      return dispatch(updateCurrentVideo(videoList[0]))
    }
  }, [videoList, currentVideo, dispatch, getVideoIndex])

  const onClickVideoListItem = useCallback(
    (item: IVideoInPlaylist) => {
      dispatch(updateCurrentVideo(item))
    },
    [dispatch],
  )

  /**
   * 비디오 삭제
   * 삭제 완료시
   *  현재 재생중인 동영상이면, 다음 영상 재생(마지막 영상일 경우 첫번째 영상)
   *  현재 재생중인 동영상이 아니면, 현재 재생중인 동영상 유지
   *  첫번째 영상이면, 썸네일 변경
   *  남은 영상이 없으면, 재생목록으로 이동
   */
  const onClickDelete = useCallback(
    (item: IVideoInPlaylist) => {
      dispatch(deleteVideoAsync.request(item.id))
      setInProgressingDeleteIdx(getVideoIndex(item))
    },
    [dispatch, getVideoIndex],
  )

  useEffect(() => {
    if (inProgressingDeleteIdx !== null) {
      switch (status) {
        case 'SUCCESS':
          // 이미 삭제 된 후의 index
          const currentVideoIndex = getVideoIndex(currentVideo)
          if (currentVideoIndex === -1) {
            if (inProgressingDeleteIdx >= videoList.length) {
              dispatch(updateCurrentVideo(videoList[0]))
            } else {
              dispatch(updateCurrentVideo(videoList[inProgressingDeleteIdx]))
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
          setInProgressingDeleteIdx(null)
      }
    }
  }, [navigate, status, inProgressingDeleteIdx, currentVideo, getVideoIndex, video.playlistId, videoList, dispatch])

  const onClickEdit = useCallback(
    (item: IVideoInPlaylist) => {
      navigate(Constants.NavAbsolutePathItems.VIDEO_EDIT, { state: item })
    },
    [navigate],
  )

  const onVideoListDragEnd = useCallback(
    (result: DropResult) => {
      const from = result.source.index,
        to = result?.destination?.index
      if (to !== undefined) {
        const request: IChangeVideoOrderInPlaylistRequest = {
          playlistId: video.playlistId as number,
          seqList: video.items.map((item, index) => {
            return {
              id: item.id,
              sequence: from !== index ? (to !== index ? item.sequence : from + 1) : to + 1,
            }
          }),
        }
        setIsPendingChangeVideoOrder(true)
        dispatch(changeVideoOrderAsync.request(request))
      }
    },
    [dispatch, video],
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
    <div className="w-full h-full max-h-full pr-[5%] grid grid-cols-12 grid-rows-[2rem_minmax(100px,_auto)]">
      <div className="col-span-12">
        <GobackLine />
      </div>
      <div className="col-span-9 pt-4 space-y-4">
        <LeftVideoRenderView playerRef={playerRef} video={currentVideo} onVideoEnd={onVideoEnd} />
      </div>
      <div className="h-full max-h-full col-span-3 flex">
        <VerticalLine />
        {isPendingChangeVideoOrder ? (
          <LoadingElement />
        ) : (
          <RightVideoListContainer
            videoList={videoList}
            currentVideo={currentVideo}
            onVideoListDragEnd={onVideoListDragEnd}
            onClickVideoListItem={onClickVideoListItem}
            onClickDelete={onClickDelete}
            onClickEdit={onClickEdit}
          />
        )}
      </div>
    </div>
  )
}
