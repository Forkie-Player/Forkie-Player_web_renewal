// 검색 화면에서 넘어온 비디오 추가 화면

import { IPlaylist, IVideo, IVideoHasRange } from '../../types'
import VideoEdit from '../videoEdit'
import { useCallback, useMemo, useState } from 'react'
import GobackLine from '../elements/GobackLine'
import clsx from 'clsx'
import './index.css'
import SelectPlaylistContainer from './container/SelectPlaylistContainer'
import { useDispatch } from 'react-redux'
import { addVideoAsync } from '../../modules/playlist/actions'
import { clearIsFirst } from '../../modules/isFirst/actions'
import { isFirstConstants } from '../../lib/constants'
import useIsSmScreen from '../../lib/hooks/useIsSmScreen'

interface IProps {
  video: IVideo
}

function VideoAdd({ video }: IProps) {
  const [videoState, setVideoState] = useState<IVideoHasRange>({ ...video, start: 0, end: 0 })
  const [showPlaylists, setShowPlaylists] = useState(false)
  const isSmScreen = useIsSmScreen()
  const dispatch = useDispatch()

  const onPlayerReady = useCallback((endTime: number) => {
    if (endTime) {
      setVideoState(prev => ({ ...prev, end: endTime }))
    }
  }, [])

  const onClickApply = useCallback((range: number[]) => {
    setVideoState(prev => ({ ...prev, start: range[0], end: range[1] }))
  }, [])

  const onClickAdd = useCallback(() => {
    setShowPlaylists(true)
  }, [])

  const onClickClosePlaylist = useCallback(() => {
    setShowPlaylists(false)
  }, [])

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

  return (
    <div className="w-full h-full max-h-full space-y-2 pb-2 2xl:pb-4 flex flex-col">
      <GobackLine />
      <div className={clsx('flex-1 flex relative w-full overflow-hidden')}>
        <div className={clsx('flex-1 px-2 lg:pr-0', isSmScreen && 'h-full', PlayerContainerClassName)}>
          <VideoEdit
            video={videoState}
            onReadyCallback={onPlayerReady}
            onApplyButtonCallback={onClickApply}
            rightButtonProps={{ onClick: onClickAdd }}
          />
        </div>
        <div className={clsx(SelectPlaylistContainerClassName, 'transition-all h-full flex')}>
          {showPlaylists && (
            <>
              <SelectPlaylistContainer
                isSmScreen={isSmScreen}
                onClickCancle={onClickClosePlaylist}
                onClickPlaylist={onClickPlaylist}
              />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoAdd
