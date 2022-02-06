// 검색 화면에서 넘어온 비디오 추가 화면

import { IPlaylist, IVideo, IVideoHasRange } from '../../types'
import { useCallback, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { addVideoAsync } from '../../modules/playlist/actions'
import { clearIsFirst } from '../../modules/isFirst/actions'
import { isFirstConstants } from '../../lib/constants'
import { RootModuleType } from '../../modules/moduleTypes'

import './index.css'
import ReactPlayer from 'react-player'
import VideoAddView from './indexView'

interface IProps {
  video: IVideo
}

function VideoAdd({ video }: IProps) {
  const [videoState, setVideoState] = useState<IVideoHasRange>({ ...video, start: 0, end: 0 })
  const { isSmScreen, playlist, isFirst } = useSelector(({ isSmScreen, playlist, isFirst }: RootModuleType) => ({
    isSmScreen,
    playlist,
    isFirst,
  }))
  const dispatch = useDispatch()

  const onPlayerReady = useCallback((player: ReactPlayer) => {
    if (player) {
      const endTime = player.getDuration()
      setVideoState(prev => ({ ...prev, end: endTime }))
    }
  }, [])

  // 적용버튼 눌렀을때.
  const onClickApply = useCallback((range: number[]) => {
    setVideoState(prev => ({ ...prev, start: range[0], end: range[1] }))
  }, [])

  // 플레이리스트에서 추가버튼 눌렀을때
  // 비디오 추가 및 isFirst 초기화
  const onClickPlaylist = async (item: IPlaylist) => {
    dispatch(clearIsFirst(isFirstConstants.ADD_FIRST))
    dispatch(addVideoAsync.request({ playlistId: item.id, video: videoState }))
  }

  const playerPropsMemo = useMemo(
    () => ({
      onReady: onPlayerReady,
    }),
    [onPlayerReady],
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
    />
  )
}

export default VideoAdd
