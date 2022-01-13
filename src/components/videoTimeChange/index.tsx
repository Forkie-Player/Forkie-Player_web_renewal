//재생화면에서 넘어온 이미 등록된 비디오를 수정하는 화면

import { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { editTimeRangeAsync } from '../../modules/video/actions'
import { IVideoInPlaylist } from '../../types'
import GobackLine from '../elements/GobackLine'
import VideoEdit from '../videoEdit'

interface IProps {
  video: IVideoInPlaylist
}
function VideoTimeChange({ video }: IProps) {
  const [videoState, setVideoState] = useState<IVideoInPlaylist>(video)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const onClickApply = useCallback((range: number[]) => {
    setVideoState(prev => ({ ...prev, start: range[0], end: range[1] }))
  }, [])

  const onClickEdit = useCallback(() => {
    dispatch(editTimeRangeAsync.request({ id: videoState.id, start: videoState.start, end: videoState.end }))
    navigate(-1)
  }, [navigate, videoState, dispatch])

  return (
    <div className="w-full h-full px-[5%] flex flex-col">
      <GobackLine />
      <div className="relative flex-1 max-h-full w-full">
        <div className="w-full h-full">
          <VideoEdit
            video={videoState}
            leftButtonProps={{ onClick: onClickApply }}
            rightButtonProps={{ onClick: onClickEdit, text: '수정' }}
          />
        </div>
      </div>
    </div>
  )
}

export default VideoTimeChange
