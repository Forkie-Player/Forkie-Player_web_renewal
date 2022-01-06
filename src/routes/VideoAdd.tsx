// 검색 화면에서 넘어온 비디오 추가 화면

import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import VideoAddIndex from '../components/videoAdd'
import { IVideo } from '../types'

function VideoAdd() {
  const location = useLocation()
  const state = location.state as IVideo
  const navigate = useNavigate()

  useEffect(() => {
    // 주소창으로 접근 했을 경우
    if (state === null) {
      navigate('/')
    }
  }, [state, navigate])

  return <VideoAddIndex video={state} />
}

export default VideoAdd
