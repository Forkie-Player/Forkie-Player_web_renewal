// 검색 화면에서 넘어온 비디오 추가 화면

import { IPlaylist, IVideo, IVideoHasRange } from '../../types'
import VideoEdit from '../videoEdit'
import { useCallback, useMemo, useState } from 'react'
import GobackLine from '../elements/GobackLine'
import clsx from 'clsx'
import { useDispatch, useSelector } from 'react-redux'
import { addVideoAsync } from '../../modules/playlist/actions'
import { clearIsFirst } from '../../modules/isFirst/actions'
import { isFirstConstants } from '../../lib/constants'
import { RootModuleType } from '../../modules/moduleTypes'
import SelectPlaylistView from './view/SelectPlaylistView'

import './index.css'

interface IProps {
  video: IVideo
}

function VideoAdd({ video }: IProps) {
  const [videoState, setVideoState] = useState<IVideoHasRange>({ ...video, start: 0, end: 0 })
  const [showPlaylists, setShowPlaylists] = useState(false)
  const { isSmScreen, playlist, isFirst } = useSelector(({ isSmScreen, playlist, isFirst }: RootModuleType) => ({
    isSmScreen,
    playlist,
    isFirst,
  }))
  const dispatch = useDispatch()

  const onPlayerReady = useCallback((endTime: number) => {
    if (endTime) {
      setVideoState(prev => ({ ...prev, end: endTime }))
    }
  }, [])

  // 적용버튼 눌렀을때.
  const onClickApply = useCallback((range: number[]) => {
    setVideoState(prev => ({ ...prev, start: range[0], end: range[1] }))
  }, [])

  // 추가버튼 눌렀을 때
  const onClickAdd = useCallback(() => {
    setShowPlaylists(true)
  }, [])

  // 플레이리스트에서 닫기버튼 눌렀을때
  const onClickClosePlaylist = () => {
    setShowPlaylists(false)
  }

  // 플레이리스트에서 추가버튼 눌렀을때
  // 비디오 추가 및 isFirst 초기화
  const onClickPlaylist = async (item: IPlaylist) => {
    dispatch(clearIsFirst(isFirstConstants.ADD_FIRST))
    dispatch(addVideoAsync.request({ playlistId: item.id, video: videoState }))
  }

  const SelectPlaylistContainerClassName = useMemo(() => {
    if (isSmScreen) {
      if (showPlaylists) {
        return 'SelectPlaylist-smScreen-show'
      } else {
        return 'SelectPlaylist-smScreen'
      }
    } else {
      if (showPlaylists) {
        return 'SelectPlaylist-show'
      } else {
        return 'SelectPlaylist'
      }
    }
  }, [isSmScreen, showPlaylists])

  const PlayerContainerClassName = useMemo(() => {
    if (isSmScreen) {
      if (showPlaylists) {
        return 'showPlayerWhenSmScreen'
      } else {
        return 'hidePlayerWhenSmScreen'
      }
    }
  }, [isSmScreen, showPlaylists])

  const RightButtonProps = useMemo(() => ({ onClick: onClickAdd }), [onClickAdd])

  return (
    <div className="w-full h-full max-h-full space-y-2 pb-2 2xl:pb-4 flex flex-col">
      <GobackLine className="mx-2" />
      <div className={'flex-1 flex relative w-full overflow-hidden'}>
        <div className={clsx('flex-1 px-2 lg:pr-0', isSmScreen && 'h-full', PlayerContainerClassName)}>
          <VideoEdit
            video={videoState}
            onReadyCallback={onPlayerReady}
            onApplyButtonCallback={onClickApply}
            rightButtonProps={RightButtonProps}
          />
        </div>
        <div className={clsx(SelectPlaylistContainerClassName, 'transition-all h-full flex')}>
          {showPlaylists && (
            <SelectPlaylistView
              isSmScreen={isSmScreen}
              playlists={playlist.items}
              isFirstOnAdd={isFirst.ADD_FIRST === isFirstConstants.FIRST}
              onClickCancle={onClickClosePlaylist}
              onClickPlaylist={onClickPlaylist}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoAdd
