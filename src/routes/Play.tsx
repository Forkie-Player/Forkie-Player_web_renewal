import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import LoadingElement from '../components/elements/loading'
import PlayIndex from '../components/play'
import { RootModuleType } from '../modules/moduleTypes'

function Play() {
  const videoList = useSelector(({ video }: RootModuleType) => video.items)
  const [loading, setLoading] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (videoList.length === 0) {
      navigate('/')
    }
    setLoading(false)
  }, [navigate, videoList])

  return <>{loading ? <LoadingElement /> : <PlayIndex videoList={videoList} />}</>
}

export default Play
