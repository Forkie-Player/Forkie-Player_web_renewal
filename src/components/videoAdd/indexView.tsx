import clsx from 'clsx'
import { useCallback, useMemo, useState } from 'react'
import { ReactPlayerProps } from 'react-player'
import { isFirstConstants } from '../../lib/constants'
import { IIsFirst } from '../../modules/isFirst/types'
import { IPlaylist, IVideoHasRange } from '../../types'
import GobackLine from '../elements/GobackLine'
import VideoEdit from '../videoEdit'
import SelectPlaylistView from './view/SelectPlaylistView'

interface IProps {
  isSmScreen: boolean
  video: IVideoHasRange
  playerProps: ReactPlayerProps
  playlists: IPlaylist[]
  isFirst: IIsFirst
  onClickPlaylist: (item: IPlaylist) => void
  onClickApply: (range: number[]) => void
  onClickAdd: () => boolean
}

function VideoAddView({
  isSmScreen,
  video,
  playerProps,
  playlists,
  isFirst,
  onClickPlaylist,
  onClickApply,
  onClickAdd: onClickAddCallback,
}: IProps) {
  const [showPlaylists, setShowPlaylists] = useState(false)

  // 추가버튼 눌렀을 때
  const onClickAdd = useCallback(() => {
    if (onClickAddCallback()) {
      setShowPlaylists(true)
    }
  }, [onClickAddCallback])

  // 플레이리스트에서 닫기버튼 눌렀을때
  const onClickClosePlaylist = () => {
    setShowPlaylists(false)
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

  const completeButtonProps = useMemo(() => ({ onClick: onClickAdd }), [onClickAdd])

  return (
    <div className="flex h-full max-h-full w-full flex-col space-y-2 pb-2 2xl:pb-4">
      <GobackLine className="mx-2" />
      <div className={'relative flex w-full flex-1 overflow-hidden'}>
        <div className={clsx('flex-1 px-2 lg:pr-0', isSmScreen && 'h-full', PlayerContainerClassName)}>
          <VideoEdit
            video={video}
            playerProps={playerProps}
            completeButtonProps={completeButtonProps}
            onRangeChangeCallback={onClickApply}
          />
        </div>
        <div className={clsx(SelectPlaylistContainerClassName, 'flex h-full transition-all')}>
          {showPlaylists && (
            <SelectPlaylistView
              isSmScreen={isSmScreen}
              playlists={playlists}
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

export default VideoAddView
