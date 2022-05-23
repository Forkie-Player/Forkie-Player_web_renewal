//재생화면에서 넘어온 이미 등록된 비디오를 수정하는 화면

import { useCallback, useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import useDispatchInteraction from '../../lib/hooks/useDispatchInteraction'
import { RootModuleType } from '../../modules/moduleTypes'
import { editTimeRangeAsync } from '../../modules/video/actions'
import { IVideoInPlaylist } from '../../types'
import GobackLine from '../elements/GobackLine'
import VideoEdit from '../videoEdit'

interface IProps {
  video: IVideoInPlaylist
}
function VideoTimeChange({ video }: IProps) {
  const [videoState, setVideoState] = useState<IVideoInPlaylist>(video)

  const videoModule = useSelector(({ video }: RootModuleType) => video)
  const status = useDispatchInteraction(videoModule)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    switch (status) {
      case 'SUCCESS':
        navigate(-1)
        break
    }
  }, [status, navigate])

  const onClickApply = useCallback((range: number[]) => {
    setVideoState(prev => ({ ...prev, start: range[0], end: range[1] }))
  }, [])

  const onClickEdit = useCallback(() => {
    if (videoModule.playlistId !== null) {
      dispatch(
        editTimeRangeAsync.request({
          playlistId: videoModule.playlistId,
          playId: videoState.id,
          startTime: videoState.start,
          endTime: videoState.end,
        }),
      )
    }
  }, [videoState, dispatch, videoModule])

  const applyButtonProps = useMemo(() => ({ onClick: onClickApply }), [onClickApply])
  const completeButtonProps = useMemo(() => ({ onClick: onClickEdit, text: '수정' }), [onClickEdit])

  return (
    <div className="w-full h-full px-2 md:px-[5%] flex flex-col">
      <GobackLine />
      <div className="relative flex-1 w-full">
        <div className="w-full h-full py-4">
          <VideoEdit video={videoState} applyButtonProps={applyButtonProps} completeButtonProps={completeButtonProps} />
        </div>
      </div>
    </div>
  )
}

export default VideoTimeChange