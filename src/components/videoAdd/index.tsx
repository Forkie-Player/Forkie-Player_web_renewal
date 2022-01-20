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
    dispatch(addVideoAsync.request({ playlistId: item.id, video: videoState }))
  }

  return (
    <div className="w-full h-full max-h-full space-y-4 pb-4 flex flex-col">
      <GobackLine />
      <div className="relative flex flex-1 w-full box-border">
        <div className={clsx(showPlaylists ? 'videoEditWrapperShrinked' : 'videoEditWrapperExpand', 'h-full')}>
          <VideoEdit
            video={videoState}
            onReadyCallback={onPlayerReady}
            onApplyButtonCallback={onClickApply}
            rightButtonProps={{ onClick: onClickAdd }}
          />
        </div>
        <div
          className={clsx(showPlaylists ? 'playlistWrapperShowUp' : '-right-[100%]', 'w-[25%] h-full absolute flex')}
        >
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
