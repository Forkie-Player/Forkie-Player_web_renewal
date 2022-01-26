// 검색 화면에서 넘어온 비디오 추가 화면

import { IPlaylist, IVideo, IVideoHasRange } from '../../types'
import VideoEdit from '../videoEdit'
import { useCallback, useState } from 'react'
import GobackLine from '../elements/GobackLine'
import clsx from 'clsx'
import './index.css'
import SelectPlaylistContainer from './container/SelectPlaylistContainer'
import { useDispatch } from 'react-redux'
import { addVideoAsync } from '../../modules/playlist/actions'
import { clearIsFirst } from '../../modules/isFirst/actions'
import { isFirstConstants } from '../../lib/constants'

interface IProps {
  video: IVideo
}

function VideoAdd({ video }: IProps) {
  const [videoState, setVideoState] = useState<IVideoHasRange>({ ...video, start: 0, end: 0 })
  const [showPlaylists, setShowPlaylists] = useState(false)
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

  return (
    <div className="w-full h-full max-h-full space-y-2 pb-2 2xl:pb-4 flex flex-col">
      <GobackLine />
      <div className="relative flex flex-1 w-full box-border overflow-hidden">
        <div className={clsx('flex-1 px-2 lg:px-0')}>
          <VideoEdit
            video={videoState}
            onReadyCallback={onPlayerReady}
            onApplyButtonCallback={onClickApply}
            rightButtonProps={{ onClick: onClickAdd }}
          />
        </div>
        <div className={clsx(showPlaylists ? 'w-48 lg:w-60' : 'w-0', 'transition-all h-full flex')}>
          {showPlaylists && (
            <>
              <SelectPlaylistContainer onClickCancle={onClickClosePlaylist} onClickPlaylist={onClickPlaylist} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoAdd
