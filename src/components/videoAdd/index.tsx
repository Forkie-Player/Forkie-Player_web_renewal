// 검색 화면에서 넘어온 비디오 추가 화면

import { IPlaylist, IVideo, IVideoHasRange } from '../../types'
import VideoEdit from '../videoEdit'
import { useCallback, useState } from 'react'
import GobackLine from '../elements/GobackLine'
import clsx from 'clsx'
import './index.css'
import VerticalLine from '../elements/VerticalLine'
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

  const onPlayerReady = (endTime: number) => {
    if (endTime) {
      setVideoState(prev => ({ ...prev, end: endTime }))
    }
  }

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
    <div className="w-full h-full px-[5%] flex flex-col">
      <GobackLine />
      <div className="relative flex flex-1 max-h-full w-full">
        <div className={clsx(showPlaylists ? 'videoEditWrapperShrinked' : 'videoEditWrapperExpand', 'h-full')}>
          <VideoEdit
            video={videoState}
            onReadyCallback={onPlayerReady}
            onClickApplyCallback={onClickApply}
            onClickAddCallback={onClickAdd}
          />
        </div>
        <div
          className={clsx(showPlaylists ? 'playlistWrapperShowUp' : '-right-[100%]', 'w-[30%] h-full absolute flex')}
        >
          {showPlaylists && (
            <>
              <VerticalLine />
              <SelectPlaylistContainer onClickCancle={onClickClosePlaylist} onClickPlaylist={onClickPlaylist} />
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default VideoAdd
