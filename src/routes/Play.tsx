import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import PlayIndex from '../components/play'
import { RootModuleType } from '../modules/moduleTypes'

function Play() {
  const videoList = useSelector(({ video }: RootModuleType) => video.items)
  const navigate = useNavigate()

  useEffect(() => {
    if (videoList.length === 0) {
      navigate('/')
    }
  }, [navigate, videoList])

  return <PlayIndex videoList={videoList} />
}

export default Play
