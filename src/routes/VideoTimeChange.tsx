//재생화면에서 넘어온 이미 등록된 비디오를 수정하는 화면

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import VideoTimeChangeIndex from '../components/videoTimeChange'
import { AppName } from '../lib/strings'
import { IVideoInPlaylist } from '../types'

function VideoTimeChange() {
  const location = useLocation()
  const state = location.state as IVideoInPlaylist
  const navigate = useNavigate()

  useEffect(() => {
    // 주소창으로 접근 했을 경우
    if (state === null) {
      navigate('/')
    }
  }, [state, navigate])

  useEffect(() => {
    document.title = `${AppName} - ${state.title}`
  }, [state.title])

  return <VideoTimeChangeIndex video={state} />
}

export default VideoTimeChange
