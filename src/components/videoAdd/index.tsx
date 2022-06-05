// 검색 화면에서 넘어온 비디오 추가 화면

import { IPlaylist, IVideo, IVideoHasRange } from '../../types'
import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVideoAsync } from '../../modules/playlist/actions'
import { clearIsFirst } from '../../modules/isFirst/actions'
import { infiniteEndTime, isFirstConstants } from '../../lib/constants'
import { RootModuleType } from '../../modules/moduleTypes'

import './index.css'
import VideoAddView from './indexView'
import { authModalActions } from '../../modules/authModal/actions'

interface IProps {
  video: IVideo
}

function VideoAdd({ video }: IProps) {
  const [videoState, setVideoState] = useState<IVideoHasRange>({ ...video, start: 0, end: infiniteEndTime })
  const { isSmScreen, playlist, isFirst, userInfo } = useSelector(
    ({ isSmScreen, playlist, isFirst, userInfo }: RootModuleType) => ({
      isSmScreen,
      playlist,
      isFirst,
      userInfo: userInfo.userInfo,
    }),
  )
  const dispatch = useDispatch()

  const onDuration = useCallback((duration: number) => {
    if (duration) {
      setVideoState(prev => ({ ...prev, end: Math.floor(duration) }))
    }
  }, [])

  // 적용버튼 눌렀을때.
  const onClickApply = useCallback((range: number[]) => {
    setVideoState(prev => ({ ...prev, start: range[0], end: range[1] }))
  }, [])

  // 추가버튼 눌렀을때
  const onClickAdd = useCallback(() => {
    if (userInfo.loginId === '') {
      dispatch(authModalActions.openAuthModal())
      return false
    }
    return true
  }, [userInfo, dispatch])

  // 플레이리스트에서 추가버튼 눌렀을때
  // 비디오 추가 및 isFirst 초기화
  const onClickPlaylist = async (item: IPlaylist) => {
    dispatch(clearIsFirst(isFirstConstants.ADD_FIRST))
    dispatch(
      addVideoAsync.request({
        playlistId: item.id,
        video: {
          ...videoState,
          startTime: videoState.start,
          endTime: videoState.end,
          channelImg: videoState.channelImage,
        },
      }),
    )
  }

  const playerPropsMemo = useMemo(
    () => ({
      onDuration: onDuration,
    }),
    [onDuration],
  )
  return (
    <VideoAddView
      video={videoState}
      isSmScreen={isSmScreen}
      playerProps={playerPropsMemo}
      playlists={playlist.items}
      isFirst={isFirst}
      onClickPlaylist={onClickPlaylist}
      onClickApply={onClickApply}
      onClickAdd={onClickAdd}
    />
  )
}

export default VideoAdd
